import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Products } from './product.model';

@Module({
  imports: [SequelizeModule.forFeature([Products])],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule { }
