import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Role } from './CreateUser.dto';

export class UserEntityDto implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  password: string;

  @ApiProperty()
  googleId: string;

  @ApiProperty()
  githubId: string;

  role: Role;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  inactivatedAt: Date;
}
