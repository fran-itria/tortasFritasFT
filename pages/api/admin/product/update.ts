import { NextApiRequest, NextApiResponse } from "next";
import withAdminAuth from "../validateAdminUser";
import updateProduct from "./services/updateProduct";


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    try {
        if (method == 'PUT') {
            const product = await updateProduct(req.body)
            res.status(200).json({ message: 'Producto actualizado con exito', product })
        }
        else throw new Error('Método no permitido')
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}

export default withAdminAuth(handler, 'actualizar un producto');