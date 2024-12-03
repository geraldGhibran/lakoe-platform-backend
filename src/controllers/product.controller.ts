import * as productService from '../services/product.service';
import { Request, Response } from 'express';

export const getAllProductByStoreId = async (req: Request, res: Response) => {
  try {
    const storeId = req.body;
    const products = productService.getAllProductByStoreId(storeId);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductByName = async (req: Request, res: Response) => {
  try {
    const name = req.body;
    const products = productService.getProductByName(name);
    res.send(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const id = req.body;
    const products = productService.deleteProductById(id);
    res.send(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ini untuk detail product
export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.body;
    const products = productService.getProductbyId(id);
    res.send(products);
  } catch (error) {
    res.status(500).json(error);
  }
};
