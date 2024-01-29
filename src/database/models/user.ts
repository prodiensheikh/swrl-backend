import { Schema, model } from "mongoose";

export interface IUser {
  _id: string;
  
  number: string;
  chatId: string;
  isVerified: boolean;
  name?: string;
  email?: string;
  otp?: string;
}

const userSchema = new Schema<IUser>({
  number: {
    type: String,
    required: true,
    unique: true
  },
  chatId: {
    type: String,
    required: true,
    unique: true
  },

  isVerified: Boolean,

  name: String,
  email: String,
  otp: String
});

const User = model<IUser>("User", userSchema);
export default User;