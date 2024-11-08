import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'john_doe' })
    name: string;

    @ApiProperty({ example: 'password123' })
    password: string;
}
