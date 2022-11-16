import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'database/database.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cardgame'),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DatabaseModule,
    UserModule,
  ],
})
export class AppModule {}
