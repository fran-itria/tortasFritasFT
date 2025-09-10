import { Order, Product, User, OrderProduct } from "../../../sequelize/db";

export default async function getOneOrder(orderId: string) {
    try {
        const order = await Order.findByPk(orderId, {
            include: [
                {
                    model: User,
                    attributes: ['name', 'email']
                }
            ]
        });

        if (!order) {
            throw new Error("Orden no encontrada");
        }

        const orderProducts = await OrderProduct.findAll({
            where: { orderId },
            include: [
                {
                    model: Product,
                    attributes: ['name']
                }
            ]
        });

        return {
            order,
            products: orderProducts
        };
    } catch (error) {
        throw error;
    }
}
