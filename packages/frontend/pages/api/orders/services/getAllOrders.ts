import { Order, User, OrderProduct, Product } from "../../../sequelize/db";

export default async function getAllOrders() {
    const orders = await Order.findAll({
        include: [
            {
                model: User,
                attributes: ['name', 'email']
            },
            {
                model: OrderProduct,
                as: 'Products',
                include: [
                    {
                        model: Product,
                        attributes: ['name']
                    }
                ]
            }
        ]
    });

    if (orders.length === 0) {
        throw new Error('No hay órdenes registradas');
    }

    return orders;
}