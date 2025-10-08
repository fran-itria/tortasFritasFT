import { MiddlewareConsumer, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminMiddleware } from "./admin.middleware";
import { Options } from "src/options/option.model";
import { Users } from "src/users/user.model";
import { Orders } from "src/orders/order.model";
import { Products } from "src/products/product.model";
import { AdminOptionsService, AdminOrdersService, AdminProductsService, AdminUsersService } from "./admin.service";
import { AdminOptionsController, AdminOrdersController, AdminProductsController, AdminUsersController } from "./admin.controller";
import { IncomesModule } from './incomes/incomes.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Options, Users, Orders, Products]),
        IncomesModule,
        ExpensesModule
    ],
    controllers: [
        AdminOptionsController,
        AdminUsersController,
        AdminOrdersController,
        AdminProductsController
    ],
    providers: [
        AdminOptionsService,
        AdminUsersService,
        AdminOrdersService,
        AdminProductsService
    ]
})

export class AdminModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AdminMiddleware)
            .forRoutes('admin');
    }
}