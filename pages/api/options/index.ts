import { NextApiRequest, NextApiResponse } from "next";
import findOptions from "./services/findOptions";
import createOptions from "./services/createOptions";
import updateOptions from "./services/updateOptions";
import deleteOptions from "./services/deleteOptions";
import getOneUser from "../user/services/find/getOneUser";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { userId } = req.body
    try {
        if (method == 'GET') {
            const option = await findOptions()
            res.status(200).json(option)
        }
        const user = await getOneUser(userId)
        if (user.getDataValue('admin')) {
            if (method == 'POST') {
                const option = await createOptions()
                res.status(201).json(option)
            }
            if (method == 'PUT') {
                const { ordersActive, openingHours, id } = req.body
                await updateOptions({ ordersActive, openingHours, id })
                res.status(200).json({ message: "Configuración actualizada correctamente" })
            }
            if (method == 'DELETE') {
                const { id } = req.body
                await deleteOptions(id)
                res.status(200).json({ message: "Configuración eliminada correctamente" })
            }
        } else throw new Error('No tienes permisos para modificar la configuración')
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }

}