import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: ConfigService, private prismaService: PrismaService) {
    super({
      clientID: config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_SECRET'),
      callbackURL: config.get('CALL_BACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    try {
      const userAlreadyExists = await this.prismaService.user.findUnique({
        where: { googleId: profile.id },
      });

      if (userAlreadyExists) {
        return done(null, userAlreadyExists);
      }

      const { email, displayName, id } = profile;

      const data = {
        name: displayName,
        email,
        googleId: id,
      };

      const newUser = await this.prismaService.user.create({
        data,
      });

      return done(null, newUser);
    } catch (error) {
      return done(error, false);
    }
  }
}
