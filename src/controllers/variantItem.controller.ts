import { Response, Request } from 'express';
import * as variantItemService from '../services/variantItem.service';
import uploader from '../middlewares/cloudinary';

export const createVariantItem = async (req: Request, res: Response) => {
  try {
    const variantItem = req.body;
    if (req.files) {
      if (req.files) {
        variantItem.images = await uploader(req.files as Express.Multer.File[]);
      } else {
        throw new Error('No image uploaded');
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteVariantItem = async (req: Request, res: Response) => {
  try {
    const id = req.body;
    const variant = variantItemService.deleteVariantItem(id);
    res.send(variant);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateVariantItem = async (req: Request, res: Response) => {
  try {
    const variant = req.body;
    if (req.files) {
      variant.images = await uploader(req.files as Express.Multer.File[]);
    }
    await variantItemService.updateVariantItem(variant);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllVariantItemByVariant = async (
  req: Request,
  res: Response,
) => {
  try {
    const variantId = req.body;
    const result =
      await variantItemService.getAllVariantItemByVariant(variantId);
    res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
