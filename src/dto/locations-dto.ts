export interface LocationDto {
  id: number;
  name: string;
  address: string;
  postalCode: number;
  cityDistrict: string;
  latitude: number;
  longitude: number;
  storeId: number;
  isMainLocation: boolean;
}
