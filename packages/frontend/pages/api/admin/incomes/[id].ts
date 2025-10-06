import { NextApiRequest, NextApiResponse } from "next";
import getOneIncome from "./services/getOneIncome";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        const { id } = req.query
        if (method !== 'GET') throw new Error('Método HTTP no permitido')
        const income = await getOneIncome(id as string)
        res.status(200).json(income)
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}