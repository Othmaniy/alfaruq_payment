import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckPhoneDto {
  @ApiProperty({ description: 'Phone number to check' })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
