import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../dtos';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  googleId: string;

  @Prop()
  githubId: string;

  @Prop({
    enum: Role,
    default: 'member',
  })
  role: Role;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  inactivatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
