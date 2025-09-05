import { NextApiRequest, NextApiResponse } from "next";
import updateOptions from "./services/updateOptions";
import validateAdminUser from "../validateAdminUser";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        const { id, ordersActive, openingHours } = req.body
        const { authorization } = req.headers;
        if (method == 'PUT') {
            await validateAdminUser(authorization as string, 'modificar la configuración')
            await updateOptions({ ordersActive, openingHours, id })
            res.status(200).json({ message: "Configuración actualizada correctamente" })
        } else {
            res.status(405).json({ message: "Método HTTP no permitido" })
        }
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}