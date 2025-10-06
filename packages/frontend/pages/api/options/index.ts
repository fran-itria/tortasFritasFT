import { NextApiRequest, NextApiResponse } from "next";
import findOptions from "./services/findOptions";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { admin } = req.body
    try {
        if (method == 'GET') {
            const option = await findOptions()
            res.status(200).json(option)
        }
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }

}