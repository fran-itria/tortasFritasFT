import { NextApiRequest, NextApiResponse } from "next";
import withAdminAuth from "../validateAdminUser";
import createBills from "./services/createBill";


async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        if (method !== 'POST') throw new Error('Método HTTP no permitido')
        const bill = await createBills(req.body)
        res.status(201).json(bill)
    } catch (error: any) {
        if (error.message.includes('invalid input value for enum')) {
            res.status(400).json({ message: "Categoria del gasto inválida" })
        } else if (error.message) res.status(405).json({ message: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}

export default withAdminAuth(handler, 'No tienes permisos para crear gastos');