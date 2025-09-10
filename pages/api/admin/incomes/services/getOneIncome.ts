import { Income } from "../../../../sequelize/db";

export default async function getOneIncome(id: string) {
    const income = await Income.findByPk(id)
    if (!income) throw new Error("No se encontró el ingreso")
    return income
}