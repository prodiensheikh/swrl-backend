import qrcode from "qrcode-terminal";
import { Client, LocalAuth } from "whatsapp-web.js";
import { handleMessage } from "./handleMessage";
import { sendReminders } from "./sendReminders";

let whatsappClient: Client | null = null;
let sendRemindersInterval: NodeJS.Timeout | null = null;

export async function initClient() {
  const client = await new Promise<Client>((resolve) => {
    const client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        args: ['--no-sandbox'],
      }
    });

    client.initialize();
    client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

    client.on("ready", () => {
      resolve(client);
    });
  });
  client.on("message", handleMessage);

  console.log("WhatsApp client is ready");
  whatsappClient = client;
  sendRemindersInterval = setInterval(() => {
    sendReminders(client);
  }, 60 * 1000);
  return client;
}

export function getWhatsappClient() {
  if (!whatsappClient) {
    throw new Error("WhatsApp client not initialized");
  }

  return whatsappClient;
}