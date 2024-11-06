import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateProductDto): Promise<Product> {
        return this.prisma.product.create({ data });
    }

    async findAll(): Promise<Product[]> {
        return this.prisma.product.findMany({
            where: { deletedAt: null }, // Only fetch products that are not soft-deleted
        });
    }

    async findOne(id: string): Promise<Product | null> {
        return this.prisma.product.findFirst({
            where: {
                id,
                deletedAt: null, // Exclude soft-deleted products
            },
        });
    }

    async update(id: string, data: UpdateProductDto): Promise<Product> {
        return this.prisma.product.update({
            where: { id },
            data,
        });
    }

    async remove(id: string): Promise<void> {
        await this.prisma.product.update({
            where: { id },
            data: { deletedAt: new Date() }, // Set deletedAt to soft-delete
        });
    }
}
