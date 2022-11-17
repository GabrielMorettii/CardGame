import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { EntityRepository } from './abstract.repository';
import { User, UserDocument } from '../schemas/user.schema';
import { Cache } from 'cache-manager';
@Injectable()
export class UsersRepository extends EntityRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) userModel: Model<UserDocument>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    super(userModel);
  }

  async create(createEntityData: unknown): Promise<UserDocument> {
    const entity = new this.entityModel(createEntityData);

    await entity.save();

    await this.setUserCache(entity);

    return entity;
  }

  async findOne(
    entityFilterQuery: FilterQuery<UserDocument>,
    projection?: Record<string, unknown>,
  ): Promise<UserDocument> {
    let user;

    if (entityFilterQuery._id) {
      user = await this.cacheManager.get(`user-${entityFilterQuery._id}`);

      if (user) user = JSON.parse(user);
    }

    if (!user) {
      user = this.entityModel
        .findOne(entityFilterQuery, {
          ...projection,
        })
        .exec();

      if (user) await this.setUserCache(user);
    }

    return user;
  }

  async setUserCache(entity: any) {
    await this.cacheManager.set(
      `user-${entity._id}`,
      JSON.stringify(entity),
      60,
    );
  }
}
