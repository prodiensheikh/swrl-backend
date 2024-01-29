import { Request, Response } from "express";
import User from "../database/models/user";
import { generateToken } from "../jwt";

export const getOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Email is required");

    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // await sendMail(email as string, otp);
    user.otp = otp;
    await user.save();
    return res.status(200).json({
      message: "OTP sent successfully",
      otp,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) throw new Error("Email and OTP are required");

    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    if (user.otp !== otp) throw new Error("OTP is incorrect");

    user.otp = undefined;
    await user.save();

    const token = generateToken(user.toObject());
    return res.status(200).json({
      message: "OTP verified successfully",
      token,
      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getSelf = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const user = await User.findOne({ _id });
    if (!user) throw new Error("User not found");

    return res.status(200).json({
      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
