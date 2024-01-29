import { Client } from "whatsapp-web.js";
import Reminder from "../database/models/reminder";

export async function sendReminders(client: Client) {
  const startTime = new Date();
  // console.log("Sending reminders at", startTime);
  const oneMinute = 60 * 1000;
  const endTime = new Date(startTime.getTime() + oneMinute);

  const reminders = await Reminder.find({
    time: {
      $gte: startTime,
      $lt: endTime,
    },
  }).populate("user", "_id chatId");

  await Promise.all(
    reminders.map(async (reminder) => {
      try {
        const { user, message } = reminder;
        if (!user.chatId) throw new Error("User chatId not found");
        
        await client.sendMessage(user.chatId, message);
        reminder.status = "completed";
        await reminder.save();
      } catch (error) {
        console.log(error);
        reminder.status = "errored"
        await reminder.save();
      }
    })
  );
}
