import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  async seedAdmin() {
    const adminPhone = process.env.ADMIN_PHONE || '0900000000';
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await this.usersService.findByPhone(adminPhone);

    if (!existingAdmin) {
      this.logger.log('No admin found, seeding default admin...');
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await this.usersService.create({
        phone: adminPhone,
        email: adminEmail,
        password: hashedPassword,
        firstName: 'System',
        lastName: 'Admin',
      });
      const newAdmin = await this.usersService.findByPhone(adminPhone);
      if (newAdmin) {
        await this.usersService.updateRole(newAdmin.id, UserRole.ADMIN);
        this.logger.log('Default admin seeded successfully');
      }
    } else {
      this.logger.log('Admin user already exists');
    }
  }
}
