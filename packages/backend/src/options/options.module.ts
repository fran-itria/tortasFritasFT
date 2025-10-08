import { Module } from "@nestjs/common";
import { OptionsController } from "./options.controller";
import { OptionsService } from "./options.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Options } from "src/options/option.model";


@Module({
    imports: [SequelizeModule.forFeature([Options])],
    controllers: [OptionsController],
    providers: [OptionsService]
})
export class OptionsModule { }