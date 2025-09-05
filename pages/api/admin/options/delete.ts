import { NextApiRequest, NextApiResponse } from "next";
import deleteOptions from "./services/deleteOptions";
import validateAdminUser from "../validateAdminUser";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        const { id } = req.body
        const { authorization } = req.headers;
        if (method == 'DELETE') {
            await validateAdminUser(authorization as string, 'eliminar la configuración')
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