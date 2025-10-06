import { Expense } from "../../../../sequelize/db";

export default async function getAllExpense() {
    const expenses = await Expense.findAll({
        order: [['date', 'DESC']]
    })
    if (expenses.length == 0) throw new Error("No hay gastos registrados")
    return expenses
}