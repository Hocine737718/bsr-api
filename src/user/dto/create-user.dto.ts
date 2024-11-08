import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'john_doe' })
    name: string;

    @ApiProperty({ example: 'password123' })
    password: string;
}
