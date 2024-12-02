export interface VariantDto {
  id: number;
  stock: number;
  weight: number;
  name: string;
  variantItemIds: number[];
  variantItemId: number;
  isActive: string;
  price: string;
  productId: number;
}
