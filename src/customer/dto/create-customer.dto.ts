import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AddressDto } from 'src/shared/dto/address.dto';

export class CreateCustomerDto {

    @ApiProperty({ example: 'John Doe' })
    @IsString()
    name: string;

    @ApiProperty({ example: '1234567890' })
    @IsOptional()
    @IsString()
    phone?: string; // Optional field

    @ApiProperty({
        example: {
            province: 'Province Name',
            municipality: 'Municipality Name',
            street: 'Street Name',
        },
        required: false
    })
    @IsOptional()
    @ValidateNested()
    @IsObject()
    @Type(() => AddressDto)
    address?: { province: string; municipality: string; street: string }; // Optional field
}
