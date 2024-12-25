import uploader from '../middlewares/cloudinary';
import * as productService from '../services/product.service';
import * as variantItemService from '../services/variantItem.service';
import * as variantService from '../services/variant.service';
import * as variantItemValueService from '../services/variantItemValue.service';
import { Request, Response } from 'express';
import { ProductDto } from '../dto/product-dto';
import { R } from '@upstash/redis/zmscore-Dc6Llqgr';

export const getAllProductByStoreId = async (req: Request, res: Response) => {
  try {
    const storeId = res.locals.user.storeId;
    const products = await productService.getAllProductByStoreId(
      Number(storeId),
    );

    res.send(products);
  } catch (error) {
    const err = error as Error;
    console.log(err);
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
    const store_id = res.locals.user.storeId;
    const products = await productService.sortProductByHighestPrice(store_id);
    console.log(products);
    // ini dimanipulasi dulu dari service
    res.send(products);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

export const sortProductByLowestPrice = async (req: Request, res: Response) => {
  try {
    const store_id = res.locals.user.storeId;
    const products = await productService.sortProductByLowestPrice(store_id);
    res.send(products);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

export const sortProductByNewest = async (req: Request, res: Response) => {
  try {
    const store_id = res.locals.user.storeId;
    const products = await productService.sortProductByNewest(store_id);
    res.send(products);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

export const sortProductByOldest = async (req: Request, res: Response) => {
  try {
    const store_id = res.locals.user.storeId;
    console.log(store_id);
    const products = await productService.sortProductByOldest(store_id);
    res.send(products);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

export const DeleteManyProduct = async (req: Request, res: Response) => {
  try {
    const ids: number[] = req.body;
    const result = productService.deleteManyProduct(ids);
    res.send({
      message: 'delete products success',
      result: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    console.log(req.files);
    const product: ProductDto = JSON.parse(req.body.product);
    const productImage = await uploader(req.files as Express.Multer.File[]);
    const variants = JSON.parse(req.body.variant);
    if (product.store_id) {
      product.store_id = Number(res.locals.user.storeId);
    }
    const variantCombinations = JSON.parse(req.body.variantCombination);

    console.log('ini productImage', productImage);

    const productResult = await productService.createProduct(
      product,
      productImage,
    );
    for (const variantCombination of variantCombinations) {
      const variantCombinationResult =
        await variantItemValueService.createVariantItemValue(
          variantCombination,
          productResult.id,
        );
    }
    for (const variant of variants) {
      const variantResult = await variantService.createVariant(
        variant.name,
        productResult.id,
      );
      const variantItemResult = await variantItemService.createManyVariantItems(
        variant.variantItem,
        variantResult.id,
      );
    }

    console.log(productResult);

    res.send({
      message: 'success',
      product: productResult,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};
