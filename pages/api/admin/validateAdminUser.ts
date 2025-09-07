import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../sequelize/db";
import validateToken from "../../validateToken";

async function validateAdminUser(token: string, message: string) {
    const data = validateToken(token) as any;
    const adminUser = await User.findByPk(data.id);
    if (!adminUser || !adminUser.getDataValue('admin')) {
        throw new Error(`No tienes permisos para ${message}`)
    }
}

export default function withAdminAuth(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>, message: string) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const { authorization } = req.headers;

            if (!authorization) {
                return res.status(401).json({ error: 'Token requerido' });
            }
            await validateAdminUser(authorization, message);
            return await handler(req, res);
        } catch (error: any) {
            if (error.message) {
                return res.status(403).json({ error: error.message });
            } else {
                return res.status(500).json({ error: 'Internal server error' });
            }
        }
    };
}