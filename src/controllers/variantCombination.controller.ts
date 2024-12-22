import { Request, Response } from 'express';

import * as variantCombinationService from '../services/variantItemValue.service';

export const updateVariantItemValue = async (req: Request, res: Response) => {
  try {
    const { variantCombinationIds, ...rest } = req.body;

    console.log(variantCombinationIds);
    const result = variantCombinationIds.forEach(async (variantId: number) => {
      await variantCombinationService.updateVariantItemValue(rest, variantId);
    });
    res.send({
      message: 'update success',
      result: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};
