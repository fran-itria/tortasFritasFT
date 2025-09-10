import { NextApiRequest, NextApiResponse } from "next";
import withAdminAuth from "../validateAdminUser";
import updateExpense from "./services/updateExpense";


async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        if (method !== 'PUT') throw new Error('Método HTTP no permitido')
        await updateExpense(req.body)
        res.status(200).json({ message: 'Gasto actualizado correctamente' })
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}

export default withAdminAuth(handler, 'modificar el gasto');