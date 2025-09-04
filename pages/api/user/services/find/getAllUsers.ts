import { Order, User } from "../../../../sequelize/db";

export default async function getAllUsers() {
    const users = await User.findAll({ include: [Order] })
    if (users.length > 0) return users
    else throw new Error('No hay usuarios registrados')
}