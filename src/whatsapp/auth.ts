import { Chat, Message } from "whatsapp-web.js";
import User, { IUser } from "../database/models/user";
import { EMAIL_NOT_FOUND, EMAIL_SENT, FIRST_MESSAGE } from "../constants/auth";

export async function handleAuth(chat: Chat, message: Message, user?: IUser) {
  if (!user) {
    const chatId = chat.id._serialized;
    const number = message.from;
    User.create({
      chatId,
      number,
      isVerified: false,
    });

    chat.sendMessage(FIRST_MESSAGE);
    return;
  }

  if (!user?.isVerified) {
    const email = findEmailFromText(message.body);
    // const success = await sendEmail(email);
    const success = true;
    if (!email || !success) {
      chat.sendMessage(EMAIL_NOT_FOUND);
      return;
    }

    await User.updateOne({ chatId: chat.id._serialized }, { email });
    chat.sendMessage(EMAIL_SENT.replace("{{email}}", email));
    return;
  }
}

const findEmailFromText = (text: string) => {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
  const matches = text.match(emailRegex);

  return matches?.[0];
};
