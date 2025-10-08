import { Module } from '@nestjs/common';
import { OrderProductService } from './order_products.service';
import { OrderProductController } from './order_products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderProduct } from './order_product.model';

@Module({
  imports: [SequelizeModule.forFeature([OrderProduct])],
  providers: [OrderProductService],
  controllers: [OrderProductController]
})
export class OrderProductModule { }
