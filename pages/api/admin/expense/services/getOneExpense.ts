import { Expense } from "../../../../sequelize/db";

export default async function getOneExpense(id: string) {
    const expense = await Expense.findByPk(id)
    if (!expense) throw new Error("No se encontró el gasto")
    return expense
}