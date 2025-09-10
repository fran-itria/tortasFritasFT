import { Expense } from "../../../../sequelize/db";
import { UpdateExpenseParams } from "./types";

export default async function updateExpense({ id, amount, category, date }: UpdateExpenseParams) {
    const [update] = await Expense.update(
        {
            amount,
            category,
            date
        },
        {
            where: { id }
        }
    )
    if (update == 0) throw new Error("No se encuentra el gasto a actualizar")
    return
}