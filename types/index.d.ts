import { IUser } from "../src/database/models/user";

declare module 'express-serve-static-core' {
  interface Request {
    user: IUser;
  }
}