export interface UserDto {
  id: number;
  name: string;
  email: string;
  phone: number;
  password: string;
  role: RoleEnum;
  locationId?: number;
  storeId?: number;
}

export enum RoleEnum {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
}
