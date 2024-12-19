import { VariantItemDto } from './variant-item-dto';

export interface VariantDto {
  id: number;

  name: string;
  variant_item?: VariantItemDto[];
  isActive: boolean;

  productId: number;
}
