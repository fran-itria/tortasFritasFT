import { Bills } from "../../../../sequelize/db";

export default async function getOneBill(id: string) {
    const bill = await Bills.findByPk(id)
    if (!bill) throw new Error("No se encontró el gasto")
    return bill
}