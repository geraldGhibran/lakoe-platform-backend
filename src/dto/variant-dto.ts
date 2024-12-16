import { VariantItemDto } from './variant-item-dto';

export interface VariantDto {
  id: number;

  name: string;
  variantItem?: VariantItemDto[];
  isActive: boolean;

  productId: number;
}
