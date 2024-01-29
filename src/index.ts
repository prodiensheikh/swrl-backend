import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import connect from "./database/connect";
import { initClient } from "./whatsapp/initClient";
import authRouter from "./routes/auth";
import remindersRouter from "./routes/reminder";
import cors from "cors";
import pluginRouter from "./routes/plugin";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

connect();
// initClient();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/reminders", remindersRouter);
app.use("/plugins", pluginRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
