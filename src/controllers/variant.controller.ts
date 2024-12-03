import { Express, Request, Response } from 'express';

import * as variantService from '../services/variant.service';

export const deleteVariant = async (req: Request, res: Response) => {
  try {
    const id = req.body;
    const variant = variantService.deleteVariant(id);
    res.send(variant);
  } catch (error) {
    res.status(500).json(error);
  }
};
