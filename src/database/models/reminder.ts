import { Schema, model } from "mongoose";
import { IUser } from "./user";

export interface IReminder {
  _id: string;
  user: IUser;

  message: string;
  time: Date;

  status: 'scheduled' | 'completed' | 'errored';

  createdAt: Date;
  updatedAt: Date;
}

const reminderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    enum: ["scheduled", "completed", "errored"],
    default: "scheduled",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

reminderSchema.pre<IReminder>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Reminder = model<IReminder>("Reminder", reminderSchema);
export default Reminder;