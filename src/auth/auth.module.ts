import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';

const jwtExpiresIn = process.env.JWT_EXPIRES_IN as StringValue | undefined;
console.log("auth module");
console.log(process.env.JWT_SECRET);
@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: jwtExpiresIn ?? '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, RolesGuard],
  // providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, PassportModule, RolesGuard],
  // exports: [AuthService, PassportModule],
})
export class AuthModule {}
