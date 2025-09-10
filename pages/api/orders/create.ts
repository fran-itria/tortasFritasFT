import { NextApiRequest, NextApiResponse } from "next";
import createOrder from "./services/createOrder";


export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        if (method === 'POST') {
            const newOrder = await createOrder(req.body)
            res.status(201).json({ message: 'Orden creada con exito', order: newOrder })
        } else throw new Error('Método HTTP no permitido')
    } catch (error: any) {
        console.log(error)
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}