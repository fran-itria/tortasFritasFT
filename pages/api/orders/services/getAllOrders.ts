import { Order, User, OrderProduct, Product } from "../../../sequelize/db";


export default async function getAllOrders() {
    const orders = await Order.findAll({
        include: [
            {
                model: User,
                attributes: ['name', 'email']
            }
        ]
    })

    if (orders.length > 0) {
        // Para cada orden, obtener sus productos
        const ordersWithProducts = await Promise.all(
            orders.map(async (order: any) => {
                const orderProducts = await OrderProduct.findAll({
                    where: { orderId: order.id },
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
            })
        );

        return ordersWithProducts;
    } else {
        throw new Error('No hay órdenes registradas')
    }
}