import { MiddlewareConsumer, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminOptionsController, AdminUsersController } from "./admin.controller";
import { AdminMiddleware } from "./admin.middleware";
import { Options } from "src/options/options.model";
import { Users } from "src/users/users.model";
import { Orders } from "src/orders/orders.model";
import { AdminOptionsService, AdminUsersService } from "./admin.service";

@Module({
    imports: [SequelizeModule.forFeature([Options, Users, Orders])],
    controllers: [AdminOptionsController, AdminUsersController],
    providers: [AdminOptionsService, AdminUsersService]
})

export class AdminModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AdminMiddleware)
            .forRoutes('admin');
    }
}