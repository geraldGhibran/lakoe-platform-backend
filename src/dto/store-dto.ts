export interface StoreDto {
  id: number;
  name: string;
  slogan: string;
  description: string;
  logoImg: string;
  bannerImg: string;
  locationIds: number[];
  bankAccountId?: number;
  productIds: number[];
  userId: number;
}
