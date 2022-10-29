import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos';
import { AuthUserDto } from './dtos/AuthUserDto';
import { GoogleGuard } from './guards/google.guard';

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

  @Get('google')
  @UseGuards(GoogleGuard)
  private async googleAuth() {
    return;
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  private googleCallback(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
