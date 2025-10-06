import { NextApiRequest, NextApiResponse } from "next";
import updateState from "./services/updateState";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        if (method !== "PUT") throw new Error("Método HTTP no permitido")
        await updateState(req.body.id, req.body.state)
        res.status(200).json({ message: "Estado de la orden actualizado con exito" })
    } catch (error: any) {
        if (error.message.includes('invalid input value for enum')) {
            res.status(400).json({ message: "Estado de la orden inválido" })
        } else if (error.message) res.status(405).json({ message: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}
