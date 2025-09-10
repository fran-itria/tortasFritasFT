import { NextApiRequest, NextApiResponse } from "next";
import withAdminAuth from "../validateAdminUser";
import getAllExpense from "./services/getAllExpense";


async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        if (method !== 'GET') throw new Error('Método HTTP no permitido')
        const expenses = await getAllExpense()
        res.status(200).json(expenses)
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}

export default withAdminAuth(handler, 'ver los gastos');