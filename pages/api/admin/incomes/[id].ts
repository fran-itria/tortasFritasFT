import { NextApiRequest, NextApiResponse } from "next";
import withAdminAuth from "../validateAdminUser";
import getOneIncome from "./services/getOneIncome";


async function handler(req: NextApiRequest, res: NextApiResponse) {
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

export default withAdminAuth(handler, 'No tienes permisos para ver el ingreso');