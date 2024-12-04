import { LocationDto } from './locations-dto';

export interface LoginDto {
  email?: string;
  username: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  name: string;
  password: string;
  phone: number;
  location?: LocationDto;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  email: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password: string;
}

// model User {
//   id       Int        @id @default(autoincrement())
//   name     String
//   email    String     @unique
//   phone    Int
//   password String
//   role     roleEnum   @default(SELLER)
//   location Locations?
//   Store    Store?
// }
