import * as templateMessageService from '../services/templateMessage.service';
import { Request, Response } from 'express';

export const createTemplateMessage = async (req: Request, res: Response) => {
  try {
    const templateMessage = req.body;
    const result =
      await templateMessageService.createTemplateMessage(templateMessage);
    res.send(result);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

export const getAllTemplateMessage = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;
    const result = await templateMessageService.getAllTemplateMessage(
      Number(storeId),
    );
    res.send(result);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

export const deleteTemplateMessage = async (req: Request, res: Response) => {
  try {
    const id = req.body;
    const result = await templateMessageService.deleteTemplateMessage(id);
    res.send(result);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

export const updateTemplateMessage = async (req: Request, res: Response) => {
  try {
    const id = req.params;
    const templateMessage = req.body;
    const result = await templateMessageService.updateTemplateMessage(
      Number(id),
      templateMessage,
    );
    res.send(result);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};
