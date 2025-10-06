import { User } from "../../../../sequelize/db";
import validateToken from "../../../../validateToken";


export default async function loginWithToken(token: string) {
    const data: any = validateToken(token)
    const user = await User.findByPk(data.id)
    if (!user) throw new Error('Usuario no encontrado, inicie sesión nuevamente')
    return user
}