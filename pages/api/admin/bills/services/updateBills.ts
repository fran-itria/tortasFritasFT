import { Bills } from "../../../../sequelize/db";
import { UpdateBillsParams } from "./types";

export default async function updateBills({ id, amount, category, date }: UpdateBillsParams) {
    const [update] = await Bills.update(
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