export interface ProductDto {
  id: number;
  name: string;
  description: string;
  imageIds: number[];
  price: number;
  isActive: boolean;
  variantsId: number;
  variantIds: number[];
  minimumOrder: number;
  storeId: number;
  categoriesId?: number;
}
