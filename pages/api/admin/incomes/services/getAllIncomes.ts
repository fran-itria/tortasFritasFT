import { Income } from "../../../../sequelize/db";


export default async function getAllIncomes() {
    const incomes = await Income.findAll({
        order: [['date', 'DESC']]
    })
    if (incomes.length == 0) throw new Error("No hay ingresos registrados")
    return incomes
}