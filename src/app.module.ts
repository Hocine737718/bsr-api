import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OrderItemModule } from './order_item/order_item.module';

@Module({
  imports: [PrismaModule, OrderModule, CustomerModule, ProductModule, UserModule, AuthModule, OrderItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
