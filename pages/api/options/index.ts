import { NextApiRequest, NextApiResponse } from "next";
import findOptions from "./services/findOptions";
import createOptions from "./services/createOptions";
import updateOptions from "./services/updateOptions";
import deleteOptions from "./services/deleteOptions";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    try {
        if (method == 'GET') {
            const option = await findOptions()
            res.status(200).json(option)
        }
        if (method == 'POST') {
            const option = await createOptions()
            res.status(201).json(option)
        }
        if (method == 'PUT') {
            const { ordersActive, openingHours, id } = req.body
            await updateOptions({ ordersActive, openingHours, id })
            res.status(200).json({ Message: "Configuración actualizada correctamente" })
        }
        if (method == 'DELETE') {
            const { id } = req.body
            await deleteOptions(id)
            res.status(200).json({ Message: "Configuración eliminada correctamente" })
        }
    } catch (error: any) {
        console.log(error)
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }

}