import { MiddlewareConsumer, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminService } from "./admin.service";
import { AdminOptionsController } from "./admin.controller";
import { AdminMiddleware } from "./admin.middleware";
import { Options } from "src/options/options.model";

@Module({
    imports: [SequelizeModule.forFeature([Options])],
    controllers: [AdminOptionsController],
    providers: [AdminService]
})

export class AdminModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AdminMiddleware)
            .forRoutes('admin');
    }
}