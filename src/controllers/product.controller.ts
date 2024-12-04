import uploader from '../middlewares/cloudinary';
import * as productService from '../services/product.service';
import { Request, Response } from 'express';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    if (req.files) {
      product.images = await uploader(req.files as Express.Multer.File[]);
    }
  } catch (error) {
    const err = error as Error;
    res.send(err.message);
  }
};
export const getAllProductByStoreId = async (req: Request, res: Response) => {
  try {
    const storeId = req.body;
    const products = productService.getAllProductByStoreId(storeId);
    res.status(200).json(products);
  } catch (error) {
    const err = error as Error;
    res.send(err.message);
  }
};

export const getProductByName = async (req: Request, res: Response) => {
  try {
    const name = req.body;
    const products = productService.getProductByName(name);
    res.send(products);
  } catch (error) {
    const err = error as Error;
    res.send(err.message);
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const id = req.body;
    const products = productService.deleteProductById(id);
    res.send(products);
  } catch (error) {
    const err = error as Error;
    res.send(err.message);
  }
};

// ini untuk detail product
export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.body;
    const products = productService.getProductbyId(id);
    res.send(products);
  } catch (error) {
    const err = error as Error;
    res.send(err.message);
  }
};
