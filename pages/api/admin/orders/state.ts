import { NextApiRequest, NextApiResponse } from "next";
import withAdminAuth from "../validateAdminUser";
import updateState from "./services/updateState";

async function handler(req: NextApiRequest, res: NextApiResponse) {
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

export default withAdminAuth(handler, 'cambiar el estado de una orden');