import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from '@prisma/client';

@Injectable()
export class CustomerService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        return this.prisma.customer.create({
            data: createCustomerDto,
        });
    }

    async findAll(): Promise<Customer[]> {
        return this.prisma.customer.findMany();
    }

    async findOne(id: string): Promise<Customer> {
        return this.prisma.customer.findUnique({ where: { id } });
    }

    async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
        return this.prisma.customer.update({
            where: { id },
            data: updateCustomerDto,
        });
    }

    async remove(id: string): Promise<void> {
        await this.prisma.customer.delete({ where: { id } });
    }
}
