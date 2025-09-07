import { NextApiRequest, NextApiResponse } from "next";
import deleteUser from "./services/deleteUser";
import withAdminAuth from "../validateAdminUser";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req;
        if (method == 'DELETE') {
            const { userId } = req.body;
            await deleteUser(userId);
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } else {
            res.status(405).json({ error: 'Método HTTP no encontrado' });
        }
    } catch (error: any) {
        if (error.message) res.status(400).json({ error: error.message });
        else res.status(500).json({ error: 'Internal server error' });
    }
}

export default withAdminAuth(handler, 'eliminar un usuario');