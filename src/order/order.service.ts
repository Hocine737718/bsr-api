import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateOrderDto): Promise<Order> {
        return this.prisma.order.create({ data });
    }

    async findAll(): Promise<Order[]> {
        return this.prisma.order.findMany({
            where: { deletedAt: null }, // Only fetch orders that are not soft-deleted
        });
    }

    async findOne(id: string): Promise<Order | null> {
        return this.prisma.order.findFirst({
            where: {
                id,
                deletedAt: null, // Exclude soft-deleted orders
            },
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
}
