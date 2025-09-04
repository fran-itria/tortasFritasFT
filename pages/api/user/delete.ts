import { NextApiRequest, NextApiResponse } from "next";
import getOneUser from "./services/find/getOneUser";
import deleteUser from "./services/delete/deleteUser";


export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        if (method == 'DELETE') {
            const { adminId, userId } = req.body
            const user = await getOneUser(adminId)
            if (user.getDataValue('admin')) {
                await deleteUser(userId)
                res.status(200).json({ message: 'Usuario eliminado correctamente' })
            } else throw new Error('No tienes permisos para eliminar usuarios')
        }
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}