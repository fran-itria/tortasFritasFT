import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from './product.model';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Products)
        private readonly productModel: typeof Products
    ) { }

    async findAll(): Promise<Products[]> {
        return this.productModel.findAll({ order: [['amount', 'ASC']] });
    }

    async findById(id: string): Promise<Products | null> {
        if (!id) throw new BadRequestException("Faltan el Id");
        return this.productModel.findByPk(id);
    }
}
