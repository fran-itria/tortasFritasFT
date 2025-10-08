import { MiddlewareConsumer, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminMiddleware } from "./admin.middleware";
import { Options } from "src/options/options.model";
import { Users } from "src/users/users.model";
import { Orders } from "src/orders/orders.model";
import { Products } from "src/products/product.model";
import { AdminOptionsService, AdminOrdersService, AdminProductsService, AdminUsersService } from "./admin.service";
import { AdminOptionsController, AdminOrdersController, AdminProductsController, AdminUsersController } from "./admin.controller";
import { IncomesModule } from './incomes/incomes.module';

@Module({
    imports: [SequelizeModule.forFeature([Options, Users, Orders, Products]), IncomesModule],
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