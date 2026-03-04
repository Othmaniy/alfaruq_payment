import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepo: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    // assign relation using id only; ensure userId exists via foreign key constraint
    const payment = this.paymentsRepo.create({
      amount: createPaymentDto.amount,
      currency: createPaymentDto.currency,
      reference: createPaymentDto.reference,
      user: { id: createPaymentDto.userId } as any,
    });
    return this.paymentsRepo.save(payment);
  }

  async findByReference(reference: string): Promise<Payment | null> {
    return this.paymentsRepo.findOne({ where: { reference } });
  }
}
