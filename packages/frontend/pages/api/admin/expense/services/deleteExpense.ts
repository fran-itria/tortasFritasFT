import { Expense } from "../../../../sequelize/db";


export default async function deleteExpense(id: string) {
    const expense = await Expense.destroy({ where: { id } })
    if (!expense) throw new Error("No se pudo eliminar el gasto")
    return expense
}