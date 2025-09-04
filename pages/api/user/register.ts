import createUser from "./services/create/createUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        if (method == 'POST') {
            const newUser = await createUser(req.body)
            res.status(200).json(newUser)
        }
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}