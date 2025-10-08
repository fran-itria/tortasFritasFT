import { MiddlewareConsumer, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminOptionsService, AdminUsersService } from "./admin.service";
import { AdminOptionsController, AdminUsersController } from "./admin.controller";
import { AdminMiddleware } from "./admin.middleware";
import { Options } from "src/options/options.model";
import { Users } from "src/users/users.model";

@Module({
    imports: [SequelizeModule.forFeature([Options, Users])],
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