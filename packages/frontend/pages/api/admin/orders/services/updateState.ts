import { Order } from "../../../../sequelize/db"

export default async function updateState(id: string, state: string) {
    if (!id) throw new Error("Falta el id")
    if (!state) throw new Error("Falta el estado")
    const [order] = await Order.update(
        { state },
        { where: { id } }
    )
    if (!order) throw new Error("No se pudo actualizar el estado del pedido")
    return order
}