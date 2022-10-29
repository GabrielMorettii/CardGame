import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { JwtGuard } from './guards/jwt.guard';
import { GoogleStrategy } from './strategy/google.strategy';
import { GoogleGuard } from './guards/google.guard';
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    JwtGuard,
    GoogleStrategy,
    GoogleGuard,
  ],
})
export class AuthModule {}
