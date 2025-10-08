import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Orders, OrderCreationAttributes } from './orders.model';
import { Users } from 'src/users/users.model';
import { Products } from 'src/products/product.model';

export enum Method {
    CASH = 'cash',
    TRANSFER = 'transfer'
}

interface CreateOrdersProps extends OrderCreationAttributes {
    products: { quantity: number, productId: string, varity?: string }[]
}

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Orders)
        private readonly ordersModel: typeof Orders,
        @InjectModel(Users)
        private readonly usersModel: typeof Users,
        @InjectModel(Products)
        private readonly productModel: typeof Products
    ) { }

    async findAll(): Promise<Orders[]> {
        const orders = await this.ordersModel.findAll({ include: [Users] });
        if (orders.length == 0) throw new NotFoundException('No hay ordenes registradas');
        return orders
    }

    async findById(id: string): Promise<Orders> {
        const order = await this.ordersModel.findByPk(id, { include: [Users] });
        if (!order) throw new NotFoundException('Orden no encontrada');
        return order
    }

    async create({ paymentMethod, products, userId, cash }: CreateOrdersProps): Promise<Orders> {
        const user: Users | null = await this.usersModel.findByPk(userId);
        if (!user) throw new NotFoundException("Usuario no encontrado");

        if (!paymentMethod) throw new Error("Debe especificar un metodo de pago")
        if (paymentMethod === 'cash' && !cash) throw new Error("Debe especificar el monto en efectivo")

        let totalAmount = 0;

        const order: Orders = await this.ordersModel.create({
            paymentMethod,
            cash,
            userId,
            amount: totalAmount
        });
        if (!order) throw new Error("No se pudo crear la orden");

        for (let i = 0; i < products.length; i++) {
            const product = await this.productModel.findByPk(products[i].productId)
            if (product) {
                totalAmount += product.amount * products[i].quantity;
            }
        }

        await order.update({ amount: totalAmount });
        return order;
    }

    async cancelOrder(id: string) {
        if (!id) throw new BadRequestException("Falta el id")
        const [order] = await this.ordersModel.update(
            { state: 'cancel' },
            { where: { id } }
        )
        if (!order) throw new NotFoundException("No se pudo cancelar el pedido")
        return order
    }
}
