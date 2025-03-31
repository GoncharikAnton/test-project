import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDtos } from './dtos/create-user.dtos';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async createUser(user: CreateUserDtos) {
    const userDB = await this.usersRepo.findOneBy({ email: user.email });
    if (userDB) throw new ConflictException('User already exist');
    const newUser = this.usersRepo.create(user);
    return this.usersRepo.save(newUser);
  }

  deleteUser() {}

  updateUser() {}

  singin() {}

  signup() {}
}
