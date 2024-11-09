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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [PrismaModule, OrderModule, CustomerModule, ProductModule, UserModule, AuthModule, OrderItemModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'), // The directory from which static files will be served
    serveRoot: '/uploads/', // Optional: Customize the route path to serve static files
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
