import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'auth/decorators';
import { JwtGuard } from 'auth/guards';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: 'List the current user logged' })
  private async getMe(@GetUser() user: User) {
    return user;
  }
}
