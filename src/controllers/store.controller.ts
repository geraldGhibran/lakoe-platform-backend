import * as storeService from '../services/store.service';
import { Request, Response } from 'express';
import { uploaderSingle } from '../middlewares/cloudinary';

export const getInformationStoreByUserId = async (
  req: Request,
  res: Response,
) => {
  try {
    const { user_id } = req.params;
    const stores = await storeService.getStoreByUserId(Number(user_id));
    res.send(stores);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllStore = async (req: Request, res: Response) => {
  try {
    const stores = await storeService.getAllStore();
    res.send(stores);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const editStoreByUserId = async (req: Request, res: Response) => {
  try {
    const store = req.body;
    const { user_id } = req.params;

    if (req.files) {
      const files = Array.isArray(req.files)
        ? req.files
        : Object.values(req.files).flat();
      store.logo_img = await uploaderSingle(files[0] as Express.Multer.File);
    }

    const result = await storeService.editStoreByUserId(store, Number(user_id));
    res.send({
      message: 'edit store success',
      result: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const editCourierStoreById = async (req: Request, res: Response) => {
  try {
    const courier = req.body;
    const storeId = res.locals.user.storeId;

    const result = await storeService.editCourierIsActiveStoreById(
      courier,
      Number(storeId),
    );
    res.send({
      message: 'edit store courier success',
      result: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
