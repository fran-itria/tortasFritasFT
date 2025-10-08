import { Module } from '@nestjs/common';
import { DbModule } from './sequelize/db.module';
import { OptionsModule } from './options/options.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    DbModule,
    AdminModule,
    OptionsModule,
    UsersModule,
    OrdersModule,
    ProductsModule,
  ],
  controllers: [],
})
export class AppModule { }
