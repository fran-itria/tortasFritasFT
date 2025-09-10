import { Order, Product, User, OrderProduct } from "../../../sequelize/db";

export default async function getOneOrder(id: string) {
    if (!id) throw new Error("Falta el id")

    const order = await Order.findByPk(id, {
        include: [
            {
                model: User,
                attributes: ['name', 'email']
            },
            {
                model: OrderProduct,
                as: "Products",
                include: [
                    {
                        model: Product,
                        attributes: ['name']
                    }
                ]
            }
        ]
    });

    if (!order) {
        throw new Error("Orden no encontrada");
    }

    return order;
}
