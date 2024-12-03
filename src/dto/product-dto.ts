import { Image } from './images-dto';
import { VariantDto } from './variant-dto';
export interface ProductDto {
  id: number;
  name: string;
  description: string;
  images: Image[];
  price: number;
  isActive: boolean;
  variant: VariantDto[];
  minimumOrder: number;
  storeId: number;
  categoriesId?: number;
}
