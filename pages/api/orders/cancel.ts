import { NextApiRequest, NextApiResponse } from "next";
import cancelOrder from "./services/updateOrder";


export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        if (method !== 'PUT') throw new Error('Método HTTP no permitido')
        await cancelOrder(req.body.id as string)
        res.status(200).json({ message: "Pedido cancelado correctamente" })
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}