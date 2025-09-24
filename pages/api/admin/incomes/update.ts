import { NextApiRequest, NextApiResponse } from "next";
import updateIncome from "./services/updateIncome";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        if (method !== 'PUT') throw new Error('Método HTTP no permitido')
        await updateIncome(req.body)
        res.status(200).json({ message: 'Ingreso actualizado correctamente' })
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}