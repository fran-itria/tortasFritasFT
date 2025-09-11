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
        if (error.message.includes('invalid input value for enum')) {
            res.status(400).json({ message: "Metodo de pago inválido" })
        } else if (error.message) res.status(405).json({ message: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}