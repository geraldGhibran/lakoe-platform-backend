import { LocationDto } from './locations-dto';
import { BankAccountDto } from './bank-account-dto';
import { ProductDto } from './product-dto';

import { UserDto } from './user-dto';

export interface StoreDto {
  name: string;
  slogan?: string;
  description?: string;
  logoImg?: string;
  bannerImg?: string;
  location?: LocationDto[];
  bankAccount?: BankAccountDto;
  products?: ProductDto[];
  user: UserDto;
}
