// import bcrypt from "bcrypt";
import { User } from "../../../../sequelize/db";
import jwt from "jsonwebtoken";

export default async function loginUser(id: string) {
    const { SECRET_KEY } = process.env
    // if (!email || !password) throw new Error('Email y contraseña son obligatorios');
    const user: any = await User.findByPk(id);
    if (!user) throw new Error('Usuario no encontrado');
    // if (!bcrypt.compareSync(password, user.password)) throw new Error('Contraseña incorrecta');
    if (SECRET_KEY) {
        const token = jwt.sign({ id: user.id, admin: user.admin }, SECRET_KEY, { expiresIn: '2h' })
        jwt.verify(token, SECRET_KEY)
        return { user, token };
    }
}