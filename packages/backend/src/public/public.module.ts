import { Module } from '@nestjs/common';
import { OptionsModule } from 'src/options/options.module';
import { OrderProductModule } from 'src/order_product/order_product.module';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        OptionsModule,
        UsersModule,
        OrdersModule,
        ProductsModule,
        OrderProductModule,
    ]
})
export class PublicModule { }
