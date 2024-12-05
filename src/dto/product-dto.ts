import { ImagesDto } from './images-dto';
import { VariantDto } from './variant-dto';
export interface ProductDto {
  id: number;
  name: string;
  description: string;
  images: ImagesDto[];
  price: number;
  isActive: boolean;
  variant?: VariantDto[];
  minimum_order: number;
  store_id: number;
  categories_id?: number;
}
