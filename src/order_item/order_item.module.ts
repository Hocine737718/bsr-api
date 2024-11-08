import { Module } from '@nestjs/common';
import { OrderItemService } from './order_item.service';
import { OrderItemController } from './order_item.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService, PrismaService],
  exports: [OrderItemService]
})
export class OrderItemModule { }
