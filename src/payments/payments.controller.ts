import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './payment.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('payments')
@ApiBearerAuth('bearerAuth')
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Payment record created', type: Payment })
  @ApiBadRequestResponse({ description: 'Invalid payment data' })
  create(@Body() dto: CreatePaymentDto, @Request() req: any): Promise<Payment> {
    const createDto = { ...dto, userId: req.user?.id } as any;
    return this.paymentsService.create(createDto);
  }
}
