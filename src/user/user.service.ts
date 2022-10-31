import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'prisma/dtos';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async listOne(id: string) {
    const userExists = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!userExists) throw new BadRequestException('User does not exists');

    delete userExists.password;

    return userExists;
  }

  public async listAll() {
    let users = await this.prismaService.user.findMany({
      where: { inactivatedAt: null },
    });

    users = users.map((user) => {
      return {
        ...user,
        password: undefined,
      };
    });

    return users;
  }

  public async update(id: string, data: UpdateUserDto) {
    data.updatedAt = new Date();

    const userExists = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!userExists) throw new BadRequestException('User does not exists');

    const updatedUser = await this.prismaService.user.update({
      where: {
        id,
      },
      data,
    });

    delete updatedUser.password;

    return updatedUser;
  }

  public async inactivate(id: string) {
    const userExists = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!userExists) throw new BadRequestException('User does not exists');

    await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        inactivatedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return true;
  }

  public async activate(id: string) {
    const userExists = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!userExists) throw new BadRequestException('User does not exists');
    else if (!userExists.inactivatedAt)
      throw new BadRequestException('User is already activated!');

    await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date(),
        inactivatedAt: null,
      },
    });

    return true;
  }
}
