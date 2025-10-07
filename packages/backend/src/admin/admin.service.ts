import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Options } from "src/options/options.model";

interface updateOptionsProps {
    ordersActive: boolean;
    openingHours: string;
    id: number;
}

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Options)
        private optionsModel: typeof Options
    ) { }

    async createOptions(): Promise<Options> {
        return this.optionsModel.create({})
    }

    async deleteOptions(id: number): Promise<void> {
        if (!id) throw new BadRequestException("Falta el id")
        const options = await this.optionsModel.destroy({
            where: { id }
        })
        if (options) return
        throw new NotFoundException("No se pudo eliminar la configuración")
    }

    async updateOptions(body: updateOptionsProps): Promise<void> {
        const { ordersActive, openingHours, id } = body
        if (!id) throw new BadRequestException("Falta el id")
        const [affectedRows] = await Options.update(
            {
                ordersActive,
                openingHours
            },
            {
                where: {
                    id: id
                }
            }
        )
        if (affectedRows === 0) {
            throw new NotFoundException("No se pudo actualizar la configuración")
        }
        return
    }
}