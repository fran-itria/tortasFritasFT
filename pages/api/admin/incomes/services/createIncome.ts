import { Income } from "../../../../sequelize/db";
import { CreateIncomeParams } from "./types";

export default async function createIncome({ amount, category, date }: CreateIncomeParams) {
    if (!amount || !category || !date) throw new Error("Faltan datos obligatorios")
    const newIncome = await Income.create({ amount, category, date })
    if (!newIncome) throw new Error("No se pudo crear el ingreso")
    return newIncome
}