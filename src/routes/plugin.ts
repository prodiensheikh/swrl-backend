import { Router } from "express";
import { applyPlugin } from "../controllers/plugin";
import { verifyUser } from "../jwt";

const pluginRouter = Router();

pluginRouter.post("/:pluginName", verifyUser, applyPlugin);

export default pluginRouter;
