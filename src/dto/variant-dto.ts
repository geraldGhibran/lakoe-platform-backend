import { VariantItemDto } from './variant-item-dto';

export interface VariantDto {
  id: number;
  stock: number;
  weight: number;
  name: string;
  variantItem: VariantItemDto[];
  isActive: string;
  price: string;
  productId: number;
}
