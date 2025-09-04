import { NextApiRequest, NextApiResponse } from "next";
import createOptions from "./services/createOptions";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req
        if (method == 'POST') {
            const option = await createOptions()
            res.status(201).json(option)
        } else {
            res.status(405).json({ message: "No tienes permisos para modificar la configuración" })
        }
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message })
        else res.status(500).json({ error: 'Internal server error' })
    }
}