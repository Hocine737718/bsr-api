import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { OrderItem } from '@prisma/client';

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateOrderItemDto): Promise<OrderItem> {

    const itemTotal = data.price * data.quantity;

    // Create the order item
    return this.prisma.orderItem.create({
      data: {
        order_id: data.order_id,
        product_id: data.product_id,
        quantity: data.quantity,
        price: data.price,
        observation: data.observation,
        item_total: itemTotal,
      },
    });
  }

  async remove(id: string, force: boolean = false): Promise<boolean> {
    if (force) {
      return this.prisma.orderItem.deleteMany({ where: { id } }).then((res) => {
        return res !== null && res !== undefined;
      });
    } else {
      return this.prisma.orderItem.updateMany({
        where: { id },
        data: { deletedAt: new Date() },
      }).then((res) => {
        return res.count > 0;
      });
    }
  }

}
