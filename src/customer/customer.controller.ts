import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('customers')
@Controller('customers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Post()
    create(@Body() data: CreateCustomerDto) {
        return this.customerService.create(data);
    }

    @Get()
    findAll() {
        return this.customerService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.customerService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UpdateCustomerDto) {
        return this.customerService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.customerService.remove(id);
    }
}
