import { Bills } from "../../../../sequelize/db";


export default async function deleteBill(id: string) {
    const bill = await Bills.destroy({ where: { id } })
    if (!bill) throw new Error("No se pudo eliminar el gasto")
    return bill
}