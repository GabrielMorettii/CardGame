import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { Role } from './CreateUser.dto';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  email?: string;

  role?: Role;

  updatedAt: Date;
}
