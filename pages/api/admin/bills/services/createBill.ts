import { Bills } from "../../../../sequelize/db";
import { CreateBillsParams } from "./types";

export default async function createBills({ amount, category, date }: CreateBillsParams) {
    if (!amount || !category || !date) throw new Error("Faltan datos obligatorios")
    const newBill = await Bills.create({ amount, category, date })
    if (!newBill) throw new Error("No se pudo crear el ingreso")
    return newBill
}