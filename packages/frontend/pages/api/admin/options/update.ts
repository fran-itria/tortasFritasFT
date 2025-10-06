import { NextApiRequest, NextApiResponse } from "next";
import updateOptions from "./services/updateOptions";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        if (method == 'PUT') {
            await updateOptions(req.body)
            res.status(200).json({ message: "Configuración actualizada correctamente" })
        } else {
            res.status(405).json({ message: "Método HTTP no permitido" })
        }
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}