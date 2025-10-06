import { NextApiRequest, NextApiResponse } from "next";
import getOneUser from "./services/find/getOneUser";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    try {
        if (method == 'GET') {
            const { id } = req.query
            const user = await getOneUser(id as string)
            res.status(200).json(user)
        } else {
            res.status(405).json({ error: 'Método no permitido' })
        }
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}