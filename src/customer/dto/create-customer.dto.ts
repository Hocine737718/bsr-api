import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {

    @ApiProperty({ example: 'John Doe' })
    name: string;

    @ApiProperty({ example: '1234567890' })
    phone?: string; // Optional field

    @ApiProperty({
        example: {
            province: 'Province Name',
            municipality: 'Municipality Name',
            street: 'Street Name',
        },
    })
    address?: { province: string; municipality: string; street: string }; // Optional field
}
