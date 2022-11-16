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
    const userExists = await this.usersRepository.findOne({ id });

    if (!userExists) throw new BadRequestException('User does not exists');

    delete userExists.password;

    return userExists;
  }

  public async listAll() {
    const users = await this.usersRepository.find(
      {
        where: { inactivatedAt: null },
      },
      { password: -1 },
    );

    return users;
  }

  public async update(id: string, data: UpdateUserDto, user: UserEntityDto) {
    // data.updatedAt = new Date();
    // const userExists = await this.prismaService.user.findUnique({
    //   where: { id },
    // });
    // if (!userExists) throw new BadRequestException('User does not exists');
    // if (data.role && user.role === 'member')
    //   throw new ForbiddenException('You dont have the permission to do this!');
    // else if (userExists.id !== id && user.role === 'member')
    //   throw new ForbiddenException('You dont have the permission to do this!');
    // const updatedUser = await this.prismaService.user.update({
    //   where: {
    //     id,
    //   },
    //   data,
    // });
    // delete updatedUser.password;
    // return updatedUser;
  }

  public async inactivate(id: string) {
    // const userExists = await this.prismaService.user.findUnique({
    //   where: { id },
    // });

    // if (!userExists) throw new BadRequestException('User does not exists');

    // await this.prismaService.user.update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     inactivatedAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // });

    return true;
  }

  public async activate(id: string) {
    // const userExists = await this.prismaService.user.findUnique({
    //   where: { id },
    // });

    // if (!userExists) throw new BadRequestException('User does not exists');
    // else if (!userExists.inactivatedAt)
    //   throw new BadRequestException('User is already activated!');

    // await this.prismaService.user.update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     updatedAt: new Date(),
    //     inactivatedAt: null,
    //   },
    // });

    return true;
  }
}
