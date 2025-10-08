import { Module } from '@nestjs/common';
import { DbModule } from './sequelize/db.module';
import { OptionsModule } from './options/options.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    DbModule,
    AdminModule,
    OptionsModule,
    UsersModule,
    OrdersModule,
  ],
  controllers: [],
})
export class AppModule { }
