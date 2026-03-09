import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { UserRole } from '../user.entity';

export class AssignRoleDto {
  @ApiProperty({ description: 'The ID of the user to assign the role to' })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'The role to assign',
    enum: UserRole,
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
