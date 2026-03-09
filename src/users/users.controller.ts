import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AssignRoleDto } from './dto/assign-role.dto';

@ApiTags('users')
@ApiBearerAuth('bearerAuth')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // @ApiOperation({ summary: 'Create a new user' })
  // @ApiCreatedResponse({
  //   description: 'The user has been successfully created.',
  //   type: User,
  // })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('assign-role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Assign a role to a user' })
  @ApiCreatedResponse({ description: 'Role assigned successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async assignRole(@Body() dto: AssignRoleDto): Promise<User> {
    return this.usersService.updateRole(dto.userId, dto.role);
  }
}
