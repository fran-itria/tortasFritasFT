import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Orders } from './orders.model';
import { Users } from 'src/users/users.model';
import { Products } from 'src/products/product.model';

@Module({
  imports: [SequelizeModule.forFeature([Orders, Users, Products])],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule { }
