import { Request, Response } from "express";
import { parsePrescription } from "../openai/prescription";

export async function applyPlugin(req: Request, res: Response) {
  try {
    const { pluginName } = req.params;

    if (pluginName === "prescription") {
      const response = await parsePrescription(req);
      res.status(200).json({ response });
      return;
    }

    res.status(404).json({
      message: "Plugin not found",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
}
