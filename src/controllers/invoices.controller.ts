import { getInvoiceById, getInvoices } from '../services/invoices.service';
import { Request, Response } from 'express';

export const getAllInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await getInvoices();
    res.status(200).json({ invoices });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getInvoiceDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const invoice = await getInvoiceById(Number(id));
    res.status(200).json({ invoice });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
