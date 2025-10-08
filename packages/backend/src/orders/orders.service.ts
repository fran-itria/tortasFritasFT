import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Orders, OrderCreationAttributes } from './orders.model';
import { Users } from 'src/users/users.model';
import { Products } from 'src/products/product.model';
import { OrderProduct } from 'src/order_product/order_product.model';

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
        private readonly productModel: typeof Products,
        @InjectModel(OrderProduct)
        private readonly orderProductModel: typeof OrderProduct
    ) { }

    async findAll(): Promise<Orders[]> {
        const orders = await this.ordersModel.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['name', 'surname', 'phone']
                },
                {
                    model: OrderProduct,
                    include: [
                        {
                            model: Products,
                            attributes: ['name']
                        }
                    ],
                }
            ]
        });
        if (orders.length == 0) throw new NotFoundException('No hay ordenes registradas');
        return orders
    }

    async findById(id: string): Promise<Orders> {
        const order = await this.ordersModel.findByPk(id,
            {
                include: [
                    {
                        model: Users,
                        attributes: ['name', 'surname', 'phone']
                    },
                    {
                        model: OrderProduct,
                        include: [
                            {
                                model: Products,
                                attributes: ['name']
                            }
                        ],
                    }
                ]
            }
        );
        if (!order) throw new NotFoundException('Orden no encontrada');
        return order
    }

    async create({ paymentMethod, products, userId, cash }: CreateOrdersProps): Promise<Orders> {
        const user: Users | null = await this.usersModel.findByPk(userId);
        if (!user) throw new NotFoundException("Usuario no encontrado");

        if (!paymentMethod) throw new BadRequestException("Debe especificar un metodo de pago")
        if (paymentMethod === 'cash' && !cash) throw new BadRequestException("Debe especificar el monto en efectivo")

        let totalAmount = 0;

        const order: Orders = await this.ordersModel.create({
            paymentMethod,
            cash,
            userId,
            amount: totalAmount
        });
        if (!order) throw new Error("No se pudo crear la orden");

        let totalPromises: Promise<unknown>[] = [];
        for (let i = 0; i < products.length; i++) {
            const newPromise = new Promise(async (resolve, reject) => {
                const product = await this.productModel.findByPk(products[i].productId)
                if (!product) reject(`Alguno de los productos no fue encontrado`);
                if (product) {
                    const quantity = products[i].quantity;
                    const unitPrice = product.dataValues.amount;

                    resolve(await this.orderProductModel.create({
                        orderId: order.id,
                        productId: product.dataValues.id,
                        quantity: quantity,
                        varity: products[i].varity,
                        unitPrice: unitPrice,
                        totalPrice: unitPrice * quantity
                    }))
                }
            })
            totalPromises.push(newPromise)
        }
        const finalOrder = await Promise.all(totalPromises)
            .then(async values => {
                const totalAmount: any = values.reduce((acc, curr: any) => acc + curr.dataValues.totalPrice, 0);
                await order.update({ amount: totalAmount });
                return order.dataValues;
            })
            .catch((error) => { throw new NotFoundException(error) })
        return finalOrder;
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
