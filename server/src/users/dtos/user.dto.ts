import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  password: string; // temp

  @Expose()
  refreshToken: string;
}
