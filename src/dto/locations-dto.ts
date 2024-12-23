export interface LocationDto {
  id: number;
  name: string;
  address: string;
  postal_code: number;
  city_district: string;
  city_district_code: number;
  subdistrict: string;
  subdistrict_code: number;
  village: string;
  province: string;
  province_code: number;
  area_id: string;
  latitude: number;
  longitude: number;
  store_id: number;
  is_main_location: boolean;
}
