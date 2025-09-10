import { NextApiRequest, NextApiResponse } from "next";
import withAdminAuth from "../validateAdminUser";
import deleteBill from "./services/deleteBill";


async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        if (method !== 'DELETE') throw new Error('Método HTTP no permitido')
        await deleteBill(req.body.id)
        res.status(200).json({ message: 'Gasto eliminado correctamente' })
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}

export default withAdminAuth(handler, 'No tienes permisos para eliminar el gasto');