import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { User } from '../users/user.entity';

@Entity()
export class Payment {
  @ApiProperty({ description: 'Primary key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Amount to pay' })
  @IsNumber()
  @Min(0)
  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @ApiProperty({ description: 'Currency code (e.g. ETB, USD)' })
  @IsString()
  @Column({ default: 'ETB' })
  currency: string;

  @ApiProperty({ description: 'Unique reference provided by payment gateway' })
  @IsString()
  @Column({ unique: true })
  reference: string;

  @ApiProperty({ description: 'Current status of the payment' })
  @IsString()
  @Column({ default: 'pending' })
  status: string;

  @ApiProperty({ description: 'Timestamp when the payment record was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.payments, { nullable: false })
  user: User;
}
