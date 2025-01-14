// src/order/order.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderItemDto } from 'src/order_item/dto/create-order_item.dto';
import { OrderItemService } from 'src/order_item/order_item.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AndersonService } from 'src/anderson/anderson.service';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrderController {
    constructor(private readonly orderService: OrderService, private readonly orderItemService: OrderItemService, private readonly andersonService: AndersonService) { }

    @Get('wilayas')
    async getWilayas() {
        return await this.andersonService.getWilayas();
    }

    @Post()
    create(@Body() data: CreateOrderDto) {
        return this.orderService.create(data);
    }

    @Get()
    findAll() {
        return this.orderService.findAll(true);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orderService.findOne(id, true);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UpdateOrderDto) {
        return this.orderService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderService.remove(id);
    }

    @Post(':orderId/items')
    async addOrderItems(@Param('orderId') orderId: string, @Body() itemsData: CreateOrderItemDto[]) {
        await this.orderService.removeItems(orderId, true);
        for (let i = 0; i < itemsData.length; i++) {
            await this.orderItemService.create(itemsData[i]);
        }
        return this.orderService.findOne(orderId, true);
    }

    @Post('confirm/:id')
    async sendToAnderson(@Param('id') id: string) {
        return await this.andersonService.send(id);
    }
}
