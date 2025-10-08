import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderProduct } from './order_product.model';

@Injectable()
export class OrderProductService {
    constructor(
        @InjectModel(OrderProduct)
        private readonly orderProductModel: typeof OrderProduct
    ) { }

    async findAll(): Promise<OrderProduct[]> {
        return this.orderProductModel.findAll();
    }
}
