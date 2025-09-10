import { NextApiRequest, NextApiResponse } from "next";
import withAdminAuth from "../validateAdminUser";
import deleteIncome from "./services/deleteIncome";


async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        if (method !== 'DELETE') throw new Error('Método HTTP no permitido')
        await deleteIncome(req.body.id)
        res.status(200).json({ message: 'Ingreso eliminado correctamente' })
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}

export default withAdminAuth(handler, 'No tienes permisos para modificar el ingreso');