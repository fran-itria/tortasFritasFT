import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Options } from "./option.model";

@Injectable()
export class OptionsService {
    constructor(
        @InjectModel(Options)
        private optionsModel: typeof Options
    ) { }

    async findAll(): Promise<Options[]> {
        const options = await this.optionsModel.findAll();
        if (options.length == 0) throw new NotFoundException('No hay configuraciones registradas');
        return options
    }
}