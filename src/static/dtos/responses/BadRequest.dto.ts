import { ApiProperty } from '@nestjs/swagger';

export class BadRequestDto {
  @ApiProperty({ default: 400 })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ default: 'Bad Request' })
  error: string;
}
