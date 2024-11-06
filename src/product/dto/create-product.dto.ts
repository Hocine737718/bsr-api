import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: 'Laptop' })
    name: string;

    @ApiProperty({ example: 'A high-end laptop with 16GB RAM.' })
    description?: string;

    @ApiProperty({ example: 1200.00 })
    price: number;
}