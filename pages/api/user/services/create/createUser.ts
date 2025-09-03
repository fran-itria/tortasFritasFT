import { User } from "../../../../sequelize/db"
import { createUserParams } from "./types"
import bcrypt from "bcrypt";

export default async function createUser(params: createUserParams) {
    const { name, surname, email, phone } = params
    let { password } = params
    if (!name || !surname || !email || !phone || !password) {
        throw new Error('Faltan datos obligatorios')
    }
    password = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
        name,
        surname,
        email,
        phone,
        password
    })
    if (newUser) return newUser
}