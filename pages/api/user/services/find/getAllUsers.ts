import { User } from "../../../../sequelize/db";

export default async function getAllUsers() {
    const users = await User.findAll()
    if (users.length > 0) return users
    else throw new Error('No hay usuarios registrados')
}