import { Module } from '@nestjs/common';
import { OrderProductService } from './order_product.service';
import { OrderProductController } from './order_product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderProduct } from './order_product.model';

@Module({
  imports: [SequelizeModule.forFeature([OrderProduct])],
  providers: [OrderProductService],
  controllers: [OrderProductController]
})
export class OrderProductModule { }
