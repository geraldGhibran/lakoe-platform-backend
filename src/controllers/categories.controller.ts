import { Request, Response } from 'express';
import categoryService from '../services/categories.service';

const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await categoryService.getCategories();
    res.json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Terjadi kesalahan saat mengambil kategori' });
  }
};

export default { getCategories };
