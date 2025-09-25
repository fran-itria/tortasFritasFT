import { User } from "../../../../sequelize/db"
import { createUserParams } from "./types"

export default async function createUser(params: createUserParams) {
    const { id, name, surname, email } = params
    if (!id || !name || !surname || !email) {
        throw new Error('Faltan datos obligatorios')
    }
    const newUser = await User.create({
        id,
        name,
        surname,
        email,
    })
    if (newUser) return newUser
}