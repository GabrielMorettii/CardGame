import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UsersRepository } from 'database/repositories';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: ConfigService, private usersRepository: UsersRepository) {
    super({
      clientID: config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_SECRET'),
      callbackURL: config.get('GOOGLE_CALL_BACK_URL'),
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
      const userAlreadyExists = await this.usersRepository.findOne({
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

      const emailAlreadyUsed = await this.usersRepository.findOne({
        where: {
          email: data.email,
        },
      });

      if (emailAlreadyUsed)
        throw new BadRequestException('The email is already used');

      const newUser = await this.usersRepository.create({
        data,
      });

      return done(null, newUser);
    } catch (error) {
      return done(error, false);
    }
  }
}
