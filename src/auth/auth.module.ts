import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy, GoogleStrategy, GithubStrategy } from './strategy';
import { GoogleGuard, JwtGuard, GithubGuard } from './guards';
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    GoogleStrategy,
    GithubStrategy,
    JwtGuard,
    GoogleGuard,
    GithubGuard,
  ],
})
export class AuthModule {}
