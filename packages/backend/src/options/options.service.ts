import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Options } from "src/options/option.model";

interface updateOptionsProps {
    ordersActive: boolean;
    openingHours: string;
    id: number;
}

@Injectable()
export class OptionsService {
    constructor(
        @InjectModel(Options)
        private optionsModel: typeof Options
    ) { }

    async findAll(): Promise<Options[]> {
        return this.optionsModel.findAll();
    }
}