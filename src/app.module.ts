import * as redisStore from 'cache-manager-redis-store';
import type { ClientOpts } from 'redis';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'database/database.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cardgame'),
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register<ClientOpts>({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    AuthModule,
    DatabaseModule,
    UserModule,
  ],
})
export class AppModule {}
