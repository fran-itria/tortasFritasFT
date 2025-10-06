import { Expense } from "../../../../sequelize/db";
import { CreateExpenseParams } from "./types";

export default async function createExpense({ amount, category, date }: CreateExpenseParams) {
    if (!amount || !category || !date) throw new Error("Faltan datos obligatorios")
    const newExpense = await Expense.create({ amount, category, date })
    if (!newExpense) throw new Error("No se pudo crear el ingreso")
    return newExpense
}