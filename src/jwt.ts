import jwt from 'jsonwebtoken';
import { IUser } from './database/models/user';
import { NextFunction, Request, Response } from 'express';
const secret = process.env.JWT_SECRET || 'secret';

export const generateToken = (payload: IUser) => {
  return jwt.sign(payload, secret);
};

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Unauthorized');

    const user = jwt.verify(token, secret);
    req.user = user as IUser;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};