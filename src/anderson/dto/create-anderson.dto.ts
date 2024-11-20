import { IsUUID, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAndersonDto {
    @ApiProperty({ example: 'a3f9d7e7-6c13-4d3d-8c0e-5c8e2c7d6e2d' })
    @IsUUID()
    order_id: string;

    @ApiProperty({
        example: 'InProgress',
        enum: ['InProgress', 'Success', 'Error'], // Adjust according to your Enum_AndersonOrder
    })
    @IsEnum(['InProgress', 'Success', 'Error'])
    status: string;
}
