import { NextApiRequest, NextApiResponse } from "next";
import withAdminAuth from "../validateAdminUser";
import bulkCreate from "./services/bulkCreate";

async function handler(req: NextApiRequest, res: NextApiResponse) {
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

export default withAdminAuth(handler, 'crear un producto');