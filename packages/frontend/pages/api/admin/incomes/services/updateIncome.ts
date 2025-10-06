import { Income } from "../../../../sequelize/db";
import { UpdateIncomeParams } from "./types";

export default async function updateIncome({ id, amount, category, date }: UpdateIncomeParams) {
    const [update] = await Income.update(
        {
            amount,
            category,
            date
        },
        {
            where: { id }
        }
    )
    if (update == 0) throw new Error("No se encuentra el ingreso a actualizar")
    return
}