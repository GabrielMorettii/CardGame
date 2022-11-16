import { ApiProperty } from '@nestjs/swagger';
import { Role } from './CreateUser.dto';

export class UserEntityDto {
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
