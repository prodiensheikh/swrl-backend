import { Message } from "whatsapp-web.js";
import User from "../database/models/user";
import { handleAuth } from "./auth";

export const handleMessage = async (message: Message) => {
  const chat = await message.getChat();

  const user = await User.findOne({ chatId: chat.id._serialized });
  if (message.body === "!reset") {
    await User.deleteOne({ chatId: chat.id._serialized });
    chat.sendMessage("OK");
    return  
  }

  if (!user || !user.isVerified) {
    handleAuth(chat, message, user?.toObject());
  }
};