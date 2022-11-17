import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        ...projection,
      })
      .exec();
  }

  async find(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery, projection);
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);

    return entity.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      { ...updateEntityData, updatedAt: new Date() },
      {
        new: true,
      },
    );
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }

  async inactivate(entityFilterQuery: FilterQuery<T>): Promise<T> {
    const inactivateResult = await this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      { inactivatedAt: new Date() },
      { new: true },
    );

    return inactivateResult;
  }

  async activate(entityFilterQuery: FilterQuery<T>): Promise<T> {
    const activateResult = await this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      { inactivatedAt: null },
      { new: true },
    );

    return activateResult;
  }
}
