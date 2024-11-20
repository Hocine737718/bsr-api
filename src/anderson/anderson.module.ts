import { forwardRef, Module } from '@nestjs/common';
import { AndersonService } from './anderson.service';
import { OrderItemModule } from 'src/order_item/order_item.module';
import { OrderService } from 'src/order/order.service';
import { HttpModule } from '@nestjs/axios';
import { OrderModule } from 'src/order/order.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, OrderItemModule, HttpModule, forwardRef(() => OrderModule),],
  providers: [AndersonService],
  exports: [AndersonService]
})
export class AndersonModule { }
