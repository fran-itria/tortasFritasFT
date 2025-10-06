import { NextApiRequest, NextApiResponse } from "next";
import bulkCreate from "./services/bulkCreate";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    try {
        if (method == 'POST') {
            await bulkCreate(req.body);
            res.status(201).json({ message: 'Productos creados con exito' });
        } else {
            res.status(405).json({ error: 'Método HTTP no permitido' });
        }
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message });
        else res.status(500).json({ error: 'Internal server error' });
    }
}