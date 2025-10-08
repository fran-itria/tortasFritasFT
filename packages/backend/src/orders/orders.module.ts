import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Orders } from './order.model';
import { Users } from 'src/users/user.model';
import { Products } from 'src/products/product.model';
import { OrderProduct } from 'src/order_product/order_product.model';

@Module({
  imports: [SequelizeModule.forFeature([Orders, Users, Products, OrderProduct])],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule { }
