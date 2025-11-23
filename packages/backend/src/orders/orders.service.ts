import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Orders, OrderCreationAttributes } from './order.model';
import { Users } from 'src/users/user.model';
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

    async create({ paymentMethod, products, userId, cash }: CreateOrdersProps): Promise<any> {
        const transaction = await this.ordersModel.sequelize?.transaction()
        try {
            const user: Users | null = await this.usersModel.findByPk(userId, { transaction });
            if (!user) throw new NotFoundException("Usuario no encontrado");
            if (!paymentMethod) throw new BadRequestException("Debe especificar un metodo de pago")
            if (paymentMethod === 'cash' && !cash) throw new BadRequestException("Debe especificar el monto en efectivo")

            let totalAmount = 0;

            const order: Orders = await this.ordersModel.create({
                paymentMethod,
                cash,
                userId,
                amount: totalAmount
            }, { transaction });
            if (!order) throw new InternalServerErrorException("No se pudo crear la orden");

            const productsIds = products.map(p => p.productId);
            const allProducts = await this.productModel.findAll({
                where: {
                    id: productsIds
                },
                transaction
            }).then(response => response.map(prod => prod.dataValues));
            if (allProducts.length !== products.length) {
                throw new NotFoundException("Alguno de los productos no fue encontrado");
            }
            const bulkCreateProducts: {
                orderId: string,
                productId: string,
                quantity: number,
                varity?: string,
                unitPrice: number,
                totalPrice: number
            }[] = allProducts.map((current) => {
                const productFound = products.findIndex(p => p.productId == current.id);
                const quantity = products[productFound].quantity;
                const unitPrice = current.amount;
                return {
                    orderId: order.id,
                    productId: current.id,
                    quantity: quantity,
                    varity: products[productFound].varity,
                    unitPrice: unitPrice,
                    totalPrice: unitPrice * quantity
                }
            })

            const orderProductCreate = await this.orderProductModel.bulkCreate(bulkCreateProducts, { transaction })
                .then(response => response.map(prod => prod.dataValues));
            totalAmount = orderProductCreate.reduce((acc, current) => acc + current.totalPrice, 0);

            await order.update({ amount: totalAmount }, { transaction });
            await transaction?.commit();

            return order.dataValues;
        } catch (error) {
            await transaction?.rollback();
            throw new InternalServerErrorException("Error al crear la orden");
        }
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
