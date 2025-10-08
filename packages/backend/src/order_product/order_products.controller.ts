import { Controller, Get, NotFoundException } from '@nestjs/common';
import { OrderProductService } from './order_products.service';

@Controller('order-product')
export class OrderProductController {
    constructor(private readonly orderProductService: OrderProductService) { }

    @Get()
    async findAll() {
        const orders_products = await this.orderProductService.findAll()
        if (orders_products.length === 0) throw new NotFoundException('No hay productos en las ordenes');
        return orders_products
    }
}
