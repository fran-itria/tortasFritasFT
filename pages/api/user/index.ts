import { NextApiRequest, NextApiResponse } from "next"
import createUser from "./services/create/createUser"
import getAllUsers from "./services/find/getAllUsers"
import updateUser from "./services/update/updateUser"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { authorization } = req.headers
    if (!authorization) throw new Error('No se encuentra autorizado')
    try {
        if (method == 'GET') {
            const users = await getAllUsers()
            res.status(200).json(users)
        }
        if (method == 'POST') {
            const newUser = await createUser(req.body)
            res.status(200).json(newUser)
        }
        if (method == 'PUT') {
            const user = await updateUser(req.body)
            res.status(200).json({ Message: "Usuario actualizado con exito", user })
        }
    }
    catch (error: any) {
        console.log(error)
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}