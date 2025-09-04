import { NextApiRequest, NextApiResponse } from "next"
import getAllUsers from "./services/find/getAllUsers"
import updateUser from "./services/update/updateUser"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        if (method == 'GET') {
            const users = await getAllUsers()
            res.status(200).json(users)
        }
        if (method == 'PUT') {
            const user = await updateUser(req.body)
            res.status(200).json({ message: "Usuario actualizado con exito", user })
        }
    }
    catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}