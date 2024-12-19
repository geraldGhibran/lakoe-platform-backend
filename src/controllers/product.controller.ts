import uploader from '../middlewares/cloudinary';
import * as productService from '../services/product.service';
import * as variantItemService from '../services/variantItem.service';
import * as variantService from '../services/variant.service';
import * as variantItemValueService from '../services/variantItemValue.service';
import { Request, Response } from 'express';
import { VariantItemDto } from '../dto/variant-item-dto';
import { VariantDto } from '../dto/variant-dto';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const { variant, variant_Item_value, ...productOnly } = product;
    const productResult = await productService.createProduct(productOnly);
    for (let i = 0; i < variant.length; i++) {
      const variantResult = await variantService.createVariant(
        variant[i].name,
        productResult.id,
      );
      const variantItemResult = await variantItemService.createManyVariantItems(
        variant[i].variant_item,
        variantResult.id,
      );
    }

    for (let i = 0; i < variant_Item_value.length; i++) {
      const variantItemValueResult =
        await variantItemValueService.createVariantItemValue(
          variant_Item_value[i],
          productResult.id,
        );
      for (let i = 0; i < variant_Item_value.length; i++) {
        const variantItemValueResult =
          await variantItemValueService.createVariantItemValue(
            variant_Item_value[i],
            productResult.id,
          );

        if (variantItemValueResult) {
          console.log('ini variantItemValueResult', variantItemValueResult);
        }
      }
      if (variantItemValueResult) {
        console.log('ini variantItemValueResult', variantItemValueResult);
      }
    }
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
    const { storeId } = req.body;
    console.log(storeId);
    const products = await productService.getAllProductByStoreId(
      Number(storeId),
    );
    console.log(products);
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
    const store_id = req.body;
    const products = productService.sortProductByHighestPrice(store_id);

    // ini dimanipulasi dulu dari service
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
