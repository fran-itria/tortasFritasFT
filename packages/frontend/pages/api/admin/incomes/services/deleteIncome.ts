import { Income } from "../../../../sequelize/db";


export default async function deleteIncome(id: string) {
    const income = await Income.destroy({ where: { id } })
    if (!income) throw new Error("No se pudo eliminar el ingreso")
    return income
}