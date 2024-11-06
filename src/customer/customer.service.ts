import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from '@prisma/client';

@Injectable()
export class CustomerService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateCustomerDto): Promise<Customer> {
        return this.prisma.customer.create({ data });
    }

    async findAll(): Promise<Customer[]> {
        return this.prisma.customer.findMany({
            where: { deletedAt: null }, // Only fetch customers that are not soft-deleted
        });
    }

    async findOne(id: string): Promise<Customer | null> {
        return this.prisma.customer.findFirst({
            where: {
                id,
                deletedAt: null, // Exclude soft-deleted customers
            },
        });
    }

    async update(id: string, data: UpdateCustomerDto): Promise<Customer> {
        return this.prisma.customer.update({
            where: { id },
            data,
        });
    }

    async remove(id: string): Promise<void> {
        await this.prisma.customer.update({
            where: { id },
            data: { deletedAt: new Date() }, // Set deletedAt to soft-delete
        });
    }
}
