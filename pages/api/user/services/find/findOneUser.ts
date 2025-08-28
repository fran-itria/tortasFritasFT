import { User } from "../../../../../sequelize/db";

export default async function findOneUser(id: string) {
    const user = await User.findByPk(id)
    if (user) return user
    else throw new Error('Usuario no encontrado')
}