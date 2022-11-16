import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UsersRepository } from 'database/repositories';
import { Strategy } from 'passport-github2';
import { VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(config: ConfigService, private usersRepository: UsersRepository) {
    super({
      clientID: config.get('GITHUB_CLIENT_ID'),
      clientSecret: config.get('GITHUB_CLIENT_SECRET'),
      callbackURL: config.get('GITHUB_CALL_BACK_URL'),
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
        githubId: profile.id,
      });

      if (userAlreadyExists) {
        return done(null, userAlreadyExists);
      }

      const { emails, displayName, id } = profile;

      const data = {
        name: displayName,
        email: emails[0].value,
        githubId: id,
      };

      const emailAlreadyUsed = await this.usersRepository.findOne({
        email: data.email,
      });

      if (emailAlreadyUsed)
        throw new BadRequestException('The email is already used');

      const newUser = await this.usersRepository.create(data);

      return done(null, newUser);
    } catch (error) {
      return done(error, false);
    }
  }
}
