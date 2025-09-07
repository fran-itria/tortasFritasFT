import { NextApiRequest, NextApiResponse } from "next";
import withAdminAuth from "../validateAdminUser";
import deleteProduct from "./services/deleteProduct";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    try {
        if (method == 'DELETE') {
            await deleteProduct(req.body.id as string)
            res.status(200).json({ message: 'Producto eliminado con exito' })
        }
        else throw new Error('Método no permitido')
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}

export default withAdminAuth(handler, 'actualizar un producto');