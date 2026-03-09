import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepo.create(createUserDto);
    return this.usersRepo.save(user);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  findByPhone(phone: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { phone } });
  }

  findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async updateRole(userId: number, role: UserRole): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    user.role = role;
    return this.usersRepo.save(user);
  }
}
