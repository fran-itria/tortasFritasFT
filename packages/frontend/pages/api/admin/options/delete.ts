import { NextApiRequest, NextApiResponse } from "next";
import deleteOptions from "./services/deleteOptions";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        const { id } = req.body
        if (method == 'DELETE') {
            await deleteOptions(id)
            res.status(200).json({ message: "Configuración eliminada correctamente" })
        } else {
            res.status(405).json({ message: "No tienes permisos para modificar la configuración" })
        }
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}