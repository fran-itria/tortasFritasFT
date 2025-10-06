import { NextApiRequest, NextApiResponse } from "next";
import deleteProduct from "./services/deleteProduct";

export default async function (req: NextApiRequest, res: NextApiResponse) {
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