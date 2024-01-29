import { Router } from "express";
import {
  getReminders,
  getReminder,
  createReminder,
  updateReminder,
  deleteReminder,
} from "../controllers/reminder";
import { verifyUser } from "../jwt";

const remindersRouter = Router();

remindersRouter.get("/", verifyUser, getReminders);
remindersRouter.get("/:id", verifyUser, getReminder);
remindersRouter.post("/", verifyUser, createReminder);
remindersRouter.put("/:id", verifyUser, updateReminder);
remindersRouter.delete("/:id", verifyUser, deleteReminder);

export default remindersRouter;
