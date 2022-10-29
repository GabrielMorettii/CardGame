import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dtos';
import * as argon2 from 'argon2';
import { AuthUserDto } from './dtos/AuthUserDto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  public async signup(data: CreateUserDto) {
    const emailAlreadyExists = await this.prismaService.user.findFirst({
      where: { email: data.email },
    });

    if (emailAlreadyExists)
      throw new BadRequestException('Email already exists!');

    data.password = await argon2.hash(data.password);

    const user = await this.prismaService.user.create({ data });

    delete user.password;

    return user;
  }

  public async signin(data: AuthUserDto) {
    const userExists = await this.prismaService.user.findFirst({
      where: { email: data.email },
    });

    if (!userExists) throw new UnauthorizedException('Invalid credentials!');

    const passwordsMatches = await argon2.verify(
      userExists.password,
      data.password,
    );

    if (!passwordsMatches)
      throw new UnauthorizedException('Invalid credentials!');

    return await this.signToken(userExists.id);
  }

  async signToken(userId: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return {
      access_token: token,
    };
  }
}
