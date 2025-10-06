import { NextApiRequest, NextApiResponse } from "next";
import createIncome from "./services/createIncome";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        if (method !== 'POST') throw new Error('Método HTTP no permitido')
        const income = await createIncome(req.body)
        res.status(201).json(income)
    } catch (error: any) {
        if (error.message.includes('invalid input value for enum')) {
            res.status(400).json({ message: "Categoria del ingreso inválida" })
        } else if (error.message) res.status(405).json({ message: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}