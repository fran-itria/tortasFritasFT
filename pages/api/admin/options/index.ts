import { NextApiRequest, NextApiResponse } from "next";
import createOptions from "./services/createOptions";
import updateOptions from "./services/updateOptions";
import deleteOptions from "./services/deleteOptions";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        const { id, ordersActive, openingHours } = req.body
        switch (method) {
            case 'POST':
                const option = await createOptions()
                res.status(201).json(option)
            case 'PUT':
                await updateOptions({ ordersActive, openingHours, id })
                res.status(200).json({ message: "Configuración actualizada correctamente" })
            case 'DELETE':
                await deleteOptions(id)
                res.status(200).json({ message: "Configuración eliminada correctamente" })
                break;
            default:
                res.status(405).json({ message: "No tienes permisos para modificar la configuración" })
                break;
        }
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}