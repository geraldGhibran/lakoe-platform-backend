import { LocationDto } from './locations-dto';
import { BankAccountDto } from './bank-account-dto';
import { ProductDto } from './product-dto';

import { UserDto } from './user-dto';

export interface StoreDto {
  name: string;
  slogan?: string;
  description?: string;
  logo_img?: string;
  user_id: number;
  location?: LocationDto[];
  bankAccount?: BankAccountDto;
  products?: ProductDto[];
  user: UserDto;
}
