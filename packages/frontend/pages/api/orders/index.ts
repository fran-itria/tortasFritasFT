import { NextApiRequest, NextApiResponse } from "next";
import getAllOrders from "./services/getAllOrders";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        if (method === 'GET') {
            const orders = await getAllOrders()
            res.status(200).json(orders)
        } else throw new Error('Método HTTP no permitido')
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}