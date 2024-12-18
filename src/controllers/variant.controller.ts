import { Request, Response } from 'express';

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

export const addVariant = async (req: Request, res: Response) => {
  try {
    const { variant, productId } = req.body;
    const result = await variantService.createVariant(variant, productId);
    res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getVariantsByProductId = async (req: Request, res: Response) => {
  try {
    const productId = req.body;
    const result = await variantService.getVariantsByProductId(productId);
    res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateVariant = async (req: Request, res: Response) => {
  try {
    const variant = req.body;
    const result = await variantService.updateVariant(variant);
    res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
