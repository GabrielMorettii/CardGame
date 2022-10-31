import { ApiProperty } from '@nestjs/swagger';

export class SuccessDto {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty()
  message: string;

  constructor(message: string, statusCode = 200) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
