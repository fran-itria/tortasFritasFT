import { User } from "../../sequelize/db";
import validateToken from "../../validateToken";


export default async function validateAdminUser(token: string, message: string) {
    const data = validateToken(token) as any;
    const adminUser = await User.findByPk(data.id);
    if (!adminUser || !adminUser.getDataValue('admin')) {
        throw new Error(`No tienes permisos para ${message}`)
    }
}