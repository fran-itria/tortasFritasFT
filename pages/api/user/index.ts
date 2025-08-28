import { User } from "../../../sequelize/db"
import { NextApiRequest, NextApiResponse } from "next"
import createUser from "./services/create/createUser"
import findAllUsers from "./services/find/findAllUsers"
import findOneUser from "./services/find/findOneUser"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method == 'POST') {
            const newUser = await createUser(req.body)
            res.status(200).json(newUser)
        }
        if (req.method == 'GET') {
            const { id } = req.query
            if (id) {
                const user = await findOneUser(id as string)
                res.status(200).json(user)
            } else {
                const users = await findAllUsers()
                res.status(200).json(users)
            }
        }
    } catch (error: any) {
        console.log(error)
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}