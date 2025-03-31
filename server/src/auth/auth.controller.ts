import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guards/jwtAuth.guard';
import { CreateUserDtos } from '../users/dtos/create-user.dtos';
import { UpdateUserDtos } from '../users/dtos/update-user.dtos';
import { AuthGuard } from '@nestjs/passport';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';

// @Serialize(UserDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signin')
  signinUser(@Body() data: CreateUserDtos) {
    return this.authService.signin(data);
  }

  @Post('/signup')
  async createUser(@Body() data: CreateUserDtos) {
    const user = await this.authService.signup(data);
    return user;
  }

  @UseGuards(AdminAuthGuard)
  @Delete('/:id')
  deleteUser(@Param() id: string) {}

  @Put('/:id')
  updateUser(@Body() data: UpdateUserDtos) {}

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // getProtectedData() {
  //   return 'This is protected data';
  // }
}
