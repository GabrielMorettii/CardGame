import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'auth/decorators';
import { JwtGuard } from 'auth/guards/jwt.guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  private async getMe(@GetUser() user: User) {
    return user;
  }
}
