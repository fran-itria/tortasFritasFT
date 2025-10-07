import { Module } from "@nestjs/common";
import { OptionsController } from "./options.controller";
import { OptionsService } from "./options.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Options } from "src/options/options.model";


@Module({
    imports: [SequelizeModule.forFeature([Options])],
    controllers: [OptionsController],
    providers: [OptionsService],
    exports: [SequelizeModule]
})
export class OptionsModule { }