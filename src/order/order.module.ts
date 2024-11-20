import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderItemModule } from 'src/order_item/order_item.module';
import { AndersonModule } from 'src/anderson/anderson.module';

@Module({
  imports: [PrismaModule, OrderItemModule, AndersonModule],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService]
})
export class OrderModule { }
