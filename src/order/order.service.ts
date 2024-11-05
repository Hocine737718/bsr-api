// src/order/order.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        return this.prisma.order.create({
            data: createOrderDto,
        });
    }

    async findAll(): Promise<Order[]> {
        return this.prisma.order.findMany();
    }

    async findOne(id: string): Promise<Order> {
        return this.prisma.order.findUnique({ where: { id } });
    }

    async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
        return this.prisma.order.update({
            where: { id },
            data: updateOrderDto,
        });
    }

    async remove(id: string): Promise<void> {
        await this.prisma.order.delete({ where: { id } });
    }
}
