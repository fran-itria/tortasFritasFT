import { User } from "../../../../sequelize/db"
import { createUserParams } from "./types"

export default async function createUser(params: createUserParams) {
    const { name, surname, email, phone, password } = params
    if (!name || !surname || !email || !phone || !password) {
        throw new Error('Faltan datos obligatorios')
    }
    const newUser = await User.create({
        name,
        surname,
        email,
        phone,
        password
    })
    if (newUser) return newUser
}