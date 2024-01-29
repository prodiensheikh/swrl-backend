import { Request, Response } from 'express';
import Reminder from '../database/models/reminder';

export const getReminders = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const { lastCreatedAt: lca, direction } = req.query;
    const lastCreatedAt = lca || new Date();

    const searchQuery = {
      user: _id,
      ...(lastCreatedAt && (direction === 'forwards' ? { time: { $gt: lastCreatedAt } } : { time: { $lt: lastCreatedAt } })),
    };

    const reminders = await Reminder.find(searchQuery)
      .sort({ time: direction === 'forwards' ? 1 : -1 })
      .limit(15)
      .populate('user', '_id');

    return res.status(200).json({
      reminders,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getReminder = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    const reminder = await Reminder.findOne({
      _id: id,
      user: _id,
    }).populate('user', '_id');

    if (!reminder) throw new Error('Reminder not found');

    return res.status(200).json({
      reminder,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const createReminder = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const { message, time } = req.body;

    const reminder = await Reminder.create({
      user: _id,
      message,
      time,
    });

    return res.status(200).json({
      reminder,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const updateReminder = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { message, time } = req.body;

    const reminder = await Reminder.findOneAndUpdate(
      {
        _id: id,
        user: _id,
      },
      {
        ...(message && { message }),
        ...(time && { time }),
      },
      {
        new: true,
      }
    ).populate('user', '_id');

    if (!reminder) throw new Error('Reminder not found');

    return res.status(200).json({
      reminder,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteReminder = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    const reminder = await Reminder.findOneAndDelete({
      _id: id,
      user: _id,
    }).populate('user', '_id');

    if (!reminder) throw new Error('Reminder not found');

    return res.status(200).json({
      reminder,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};