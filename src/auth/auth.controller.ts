import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos';
import { AuthUserDto } from './dtos/AuthUserDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  private async signup(@Body() data: CreateUserDto) {
    return await this.authService.signup(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  private async signin(@Body() data: AuthUserDto) {
    return await this.authService.signin(data);
  }

  // @Get('google')
  // private googleAuth() {}
}
