import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Options } from "src/options/options.model";
import { Orders } from "src/orders/orders.model";
import { Users } from "src/users/users.model";

interface updateOptionsProps {
    ordersActive: boolean;
    openingHours: string;
    id: number;
}

@Injectable()
export class AdminOptionsService {
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

@Injectable()
export class AdminUsersService {
    constructor(
        @InjectModel(Users)
        private usersModel: typeof Users
    ) { }

    async inactiveUser(id: string): Promise<void> {
        if (!id) throw new BadRequestException("Falta el id")
        const [affectedRows] = await this.usersModel.update(
            {
                active: false
            },
            {
                where: {
                    id: id
                }
            }
        )
        if (affectedRows === 0) {
            throw new NotFoundException("No se pudo eliminar el usuario")
        }
        return
    }
}

@Injectable()
export class AdminOrdersService {
    constructor(
        @InjectModel(Orders)
        private readonly ordersModel: typeof Orders
    ) { }
    async updateState(
        id: number,
        state: "pending" | "cancel" | "accept" | "completed" | "delivered"
    ) {
        if (!id) throw new BadRequestException("Falta el id")
        if (!state) throw new BadRequestException("Falta el estado")
        const [order] = await this.ordersModel.update(
            { state },
            { where: { id } }
        )
        if (!order) throw new NotFoundException("No se pudo actualizar el estado del pedido")
        return order
    }
}