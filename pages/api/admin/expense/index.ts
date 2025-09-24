import { NextApiRequest, NextApiResponse } from "next";
import getAllExpense from "./services/getAllExpense";


export default async function (req: NextApiRequest, res: NextApiResponse) {
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