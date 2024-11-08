import { IsString, IsUUID, IsInt, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
    @IsUUID()
    @ApiProperty({ example: 'order-uuid', description: 'The UUID of the order' })
    order_id: string;

    @IsUUID()
    @ApiProperty({ example: 'product-uuid', description: 'The UUID of the product' })
    product_id: string;

    @IsInt()
    @Min(1)
    @ApiProperty({ example: 2, description: 'Quantity of the product' })
    quantity: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Special note for this product', required: false })
    observation?: string;

    @IsNumber()
    @Min(0)
    @ApiProperty({ example: 50, description: 'Total price for this order item' })
    price: number;
}
