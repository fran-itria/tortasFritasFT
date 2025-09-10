import { Bills } from "../../../../sequelize/db";

export default async function getAllBills() {
    const bills = await Bills.findAll({
        order: [['date', 'DESC']]
    })
    if (bills.length == 0) throw new Error("No hay gastos registrados")
    return bills
}