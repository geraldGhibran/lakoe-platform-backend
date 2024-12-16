import uploader from '../middlewares/cloudinary';
import * as productService from '../services/product.service';
import * as variantItemService from '../services/variantItem.service';
import * as variantService from '../services/variant.service';
import { Request, Response } from 'express';
import { VariantItemDto } from '../dto/variant-item-dto';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;

    const { variant, ...productOnly } = product;
    const variantList = Object.keys(variant);
    const variantItemList: VariantItemDto[][] = Object.values(variant);

    const productResult = await productService.createProduct(productOnly);

    // variantResult.map((item, index) => {
    //   console.log(`ini dari variant`, item, index)
    // })
    await Promise.all(
      variantItemList.map(async (items, index) => {
        const variantName = variantList[index];
        const createdVariant = await variantService.createVariant(
          variantName,
          productResult.id,
        );

        await Promise.all(
          items.map(async (item) => {
            await variantItemService.createVariantItem(item, createdVariant.id);
          }),
        );
      }),
    );

    res.send({
      message: 'success',
    });
  } catch (error) {
    const err = error as Error;
    console.log(err);
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
    res.status(500).send(err.message);
  }
};

export const getProductByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    console.log(name);
    const products = await productService.getProductByName(name);
    res.send(products);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const id = req.body;
    const products = productService.deleteProductById(id);
    res.send(products);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
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
    res.status(500).send(err.message);
  }
};

export const getProductByUrl = async (req: Request, res: Response) => {
  try {
    const url = req.body;
    const products = productService.getProductByUrl(url);
    res.send(products);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const { id, product } = req.body;
    if (req.files) {
      product.images = await uploader(req.files as Express.Multer.File[]);
    }
    const products = productService.updateProductById(id, product);
    res.send(products);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

// sorting Product by highest price

export const sortProductByHighestPrice = async (
  req: Request,
  res: Response,
) => {
  try {
    const store_id = req.body;
    const products = productService.sortProductByHighestPrice(store_id);
    res.send(products);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

export const sortProductByLowestPrice = async (req: Request, res: Response) => {
  try {
    const store_id = req.body;
    const products = productService.sortProductByLowestPrice(store_id);
    res.send(products);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

export const sortProductByNewest = async (req: Request, res: Response) => {
  try {
    const store_id = req.body;
    const products = productService.sortProductByNewest(store_id);
    res.send(products);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};
