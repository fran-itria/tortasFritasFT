import { User } from "../../../../../sequelize/db";

export default async function findAllUsers() {
    const users = await User.findAll()
    if (users.length > 0) return users
    else throw new Error('No hay usuarios registrados')
}