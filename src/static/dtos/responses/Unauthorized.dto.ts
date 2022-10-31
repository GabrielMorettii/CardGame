import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedDto {
  @ApiProperty({ default: 401 })
  statusCode: number;

  @ApiProperty({ default: 'Invalid Credentials' })
  message: string;

  @ApiProperty({ default: 'Unauthorized' })
  error: string;
}
