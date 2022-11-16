import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersRepository } from 'database/repositories';
import { UpdateUserDto, UserEntityDto } from '../database/dtos';

@Injectable()
export class UserService {
  constructor(private usersRepository: UsersRepository) {}

  public async listOne(id: string) {
    const userExists = await this.usersRepository.findOne(
      { _id: id },
      { __v: 0 },
    );

    if (!userExists) throw new BadRequestException('User does not exists');

    return userExists;
  }

  public async listAll() {
    const users = await this.usersRepository.find(
      {
        inactivatedAt: null,
      },
      { __v: 0 },
    );

    return users;
  }

  public async update(id: string, data: UpdateUserDto, user: UserEntityDto) {
    const userExists = await this.usersRepository.findOne({
      _id: id,
    });

    if (!userExists) throw new BadRequestException('User does not exists');

    if (data.role && user.role === 'member')
      throw new ForbiddenException('You dont have the permission to do this!');
    else if (userExists.id !== id && user.role === 'member')
      throw new ForbiddenException('You dont have the permission to do this!');

    const updatedUser = await this.usersRepository.findOneAndUpdate(
      {
        _id: id,
      },
      data,
    );

    delete updatedUser.password;

    return updatedUser;
  }

  public async inactivate(id: string) {
    const userExists = await this.usersRepository.findOne({ _id: id });

    if (!userExists) throw new BadRequestException('User does not exists');

    const isInactivated = await this.usersRepository.inactivate({
      _id: id,
    });

    if (isInactivated) return true;

    throw new BadRequestException('Something went wrong during inactivaction!');
  }

  public async activate(id: string) {
    const userExists = await this.usersRepository.findOne({ _id: id });

    if (!userExists) throw new BadRequestException('User does not exists');
    else if (!userExists.inactivatedAt)
      throw new BadRequestException('User is already activated!');

    const isActivated = await this.usersRepository.activate({
      _id: id,
    });

    if (isActivated) return true;

    throw new BadRequestException('Something went wrong during activaction!');
  }
}
