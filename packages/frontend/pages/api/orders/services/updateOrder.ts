import { Order } from "../../../sequelize/db"

export default async function cancelOrder(id: string) {
    if (!id) throw new Error("Falta el id")
    console.log(id)
    const [order] = await Order.update(
        { state: 'cancel' },
        { where: { id } }
    )
    if (!order) throw new Error("No se pudo cancelar el pedido")
    return order
}