import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Options } from "src/options/option.model";
import { Orders } from "src/orders/order.model";
import { Products } from "src/products/product.model";
import { Users } from "src/users/user.model";

interface updateOptionsProps {
    id: string
    ordersActive?: boolean;
    hours?: { id: string, day: string, morning: string[], afternoon: string[] }[];
    address?: string
}
interface productCreateProps {
    name: string
    amount: number
    description?: string
    varity?: { id: string, name: string, stock: boolean }[]
    soldOut?: boolean
    image?: string
}

interface updateProductProps {
    id: string
    name?: string
    amount?: number
    description?: string
    varity?: { id: string, name: string, stock: boolean }[]
    soldOut?: boolean
    image?: string
}

@Injectable()
export class AdminOptionsService {
    constructor(
        @InjectModel(Options)
        private optionsModel: typeof Options
    ) { }

    async createOptions(): Promise<Options> {
        return this.optionsModel.create()
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
        const { id, ordersActive, hours, address } = body
        if (!id) throw new BadRequestException("Falta el id")
        const [affectedRows] = await Options.update(
            {
                ordersActive,
                open: hours,
                address
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
    ): Promise<Number> {
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


@Injectable()
export class AdminProductsService {
    constructor(
        @InjectModel(Products)
        private readonly productsModel: typeof Products
    ) { }

    async bulkCreate(products: productCreateProps[]): Promise<Products[]> {
        const createdProducts = await this.productsModel.bulkCreate(products as any);
        if (createdProducts) return createdProducts;
        else throw new Error("No se pudieron crear los productos");
    }

    async create(productData: productCreateProps): Promise<Products> {
        const { name, amount, description, soldOut, varity, image } = productData;
        if (!name || !amount) throw new BadRequestException("Faltan datos obligatorios")
        const newProduct = await this.productsModel.create({ amount, name, description, soldOut, varity, image })
        if (newProduct) return newProduct
        else throw new Error("No se pudo crear el producto")
    }

    async delete(id: string): Promise<void> {
        if (!id) throw new BadRequestException("Falta el id")
        const deleteProduct = await this.productsModel.destroy({ where: { id } })
        if (deleteProduct) return
        throw new NotFoundException("No se pudo eliminar el producto")
    }

    async soldOut(id: string): Promise<void> {
        const product = await this.productsModel.update({ soldOut: true }, { where: { id } })
        if (!product) throw new NotFoundException("No se pudo actualizar el estado del producto")
        return
    }

    async update(props: updateProductProps) {
        const { id, amount, description, image, name, soldOut, varity } = props
        if (!id) throw new Error("Falta el id")
        const [product] = await this.productsModel.update(
            {
                amount,
                description,
                image,
                name,
                soldOut,
                varity
            },
            {
                where: { id }
            }
        )
        if (product === 0) {
            throw new Error("No se encuentra el producto")
        }
        const productUpdated = await this.productsModel.findByPk(id)
        return productUpdated
    }
}