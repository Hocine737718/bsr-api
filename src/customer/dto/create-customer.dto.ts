import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {

    @ApiProperty({ example: 'John Doe' })
    name: string;

    @ApiProperty({ example: 'johndoe@example.com' })
    email: string;

    @ApiProperty({ example: '1234567890' })
    phone?: string; // Optional field
}
