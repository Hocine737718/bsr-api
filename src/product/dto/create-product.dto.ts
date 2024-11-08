import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ example: 'Laptop' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'A high-end laptop with 16GB RAM.', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 1200.00 })
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty({ example: 'path/to/image.jpg', required: false })
    @IsOptional()
    @IsString()
    image?: string;
}