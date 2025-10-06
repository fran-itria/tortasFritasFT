import { Order, User, OrderProduct, Product } from "../../../sequelize/db";
import getProducgtById from "../../product/services/getProductById";
import { CreateOrdersProps, Method } from "./types";

const chipaText = "Chipa";
export default async function createOrder({ userId, paymentMethod, cash, products }: CreateOrdersProps) {
    const user: any = await User.findByPk(userId);
    if (!user) throw new Error("Usuario no encontrado");

    if (!paymentMethod) throw new Error("Debe especificar un metodo de pago")
    if (paymentMethod == Method.CASH && !cash) throw new Error("Debe especificar el monto en efectivo")
    const order: any = await Order.create({
        paymentMethod,
        cash
    });

    let totalAmount = 0;
    // const chipaId: any = await Product.findOne(
    //     {
    //         where: { name: "Chipa" },
    //         attributes: ['id']
    //     },
    // )
    // const chipas = products.filter(p => p.productId == chipaId.dataValues.id)
    //     .reduce((quantity, c) => quantity + c.quantity, 0)

    for (let i = 0; i < products.length; i++) {
        const product = await getProducgtById(products[i].productId)

        if (product) {
            const name = product.dataValues.name;
            const quantity = products[i].quantity;
            // const unitPrice = (name == chipaText && chipas >= 6) ? 800 : product.dataValues.amount;
            const unitPrice = product.dataValues.amount;
            const totalPrice = unitPrice * quantity;
            const varity = products[i].varity || null;

            totalAmount += totalPrice;

            await OrderProduct.create({
                orderId: order.id,
                productId: product.dataValues.id,
                quantity: quantity,
                varity: varity,
                unitPrice: unitPrice,
                totalPrice: totalPrice
            });
        }
    }

    await order.update({ amount: totalAmount });

    if (!order) throw new Error("No se pudo crear la orden");
    await user.addOrder(order)
    return order
}