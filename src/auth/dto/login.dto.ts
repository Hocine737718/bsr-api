import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'john_doe' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    password: string;
}
