import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '@prisma/client';
import { OrderItemService } from 'src/order_item/order_item.service';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService, private readonly orderItemService: OrderItemService) { }

    async create(data: CreateOrderDto): Promise<Order> {
        return this.prisma.order.create({ data });
    }

    async findAll(doInclude: boolean = false): Promise<Order[]> {
        return this.prisma.order.findMany({
            where: { deletedAt: null }, // Only fetch orders that are not soft-deleted
            include: {
                items: doInclude,
                customer: doInclude
            }
        });
    }

    async findOne(id: string, doInclude: boolean = false): Promise<Order | null> {
        return this.prisma.order.findFirst({
            where: {
                id,
                deletedAt: null, // Exclude soft-deleted orders
            },
            include: {
                items: doInclude,
                customer: doInclude
            }
        });
    }

    async update(id: string, data: UpdateOrderDto): Promise<Order> {
        return this.prisma.order.update({
            where: { id },
            data,
        });
    }

    async remove(id: string): Promise<void> {
        await this.prisma.order.update({
            where: { id },
            data: { deletedAt: new Date() }, // Set deletedAt to soft-delete
        });
    }

    async removeItems(id: string, force: boolean = false): Promise<void> {
        let items = await this.prisma.orderItem.findMany({ where: { order_id: id } });
        if (items && items.length) {
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                await this.orderItemService.remove(item.id, force);
            };
        }
    }
}
