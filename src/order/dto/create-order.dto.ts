import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {

    @ApiProperty({ example: 'b7f7a5b2-5077-4b5d-8e91-09ff9d9e7618' }) // Example UUID
    customerId: string; // UUID as a string

    @ApiProperty({ example: 100.00 })
    total: number;

    @ApiProperty({ example: "an example of observation", required: false })
    @IsOptional()  // Optional field
    @IsString()
    observation?: string; // The observation field
}

