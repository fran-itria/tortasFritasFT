import { NextApiRequest, NextApiResponse } from "next"
import createUser from "./services/create/createUser"
import findAllUsers from "./services/find/getAllUsers"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method == 'POST') {
            const newUser = await createUser(req.body)
            res.status(200).json(newUser)
        }
        if (req.method == 'GET') {
            const users = await findAllUsers()
            res.status(200).json(users)
        }
    }
    catch (error: any) {
        console.log(error)
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}