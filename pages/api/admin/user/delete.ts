import { NextApiRequest, NextApiResponse } from "next";
import deleteUser from "./services/deleteUser";
import validateAdminUser from "../validateAdminUser";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        const { userId } = req.body
        const { authorization } = req.headers;
        if (method == 'DELETE') {
            await validateAdminUser(authorization as string, 'eliminar usuarios')
            await deleteUser(userId)
            res.status(200).json({ message: 'Usuario eliminado correctamente' })
        } else res.status(405).json({ error: 'Método HTTP no encontrado' })
    }
    catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}