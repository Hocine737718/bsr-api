import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderItemModule } from 'src/order_item/order_item.module';

@Module({
  imports: [PrismaModule, OrderItemModule],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule { }
