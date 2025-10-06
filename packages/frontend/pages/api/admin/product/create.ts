import { NextApiRequest, NextApiResponse } from "next";
import createProduct from "./services/createProduct";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    try {
        if (method == 'POST') {
            await createProduct(req.body);
            res.status(201).json({ message: 'Producto creado con exito' });
        } else {
            res.status(405).json({ error: 'Método HTTP no permitido' });
        }
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message });
        else res.status(500).json({ error: 'Internal server error' });
    }
}