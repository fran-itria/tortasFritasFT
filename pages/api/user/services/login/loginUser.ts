import bcrypt from "bcrypt";
import { User } from "../../../../sequelize/db";
import jwt from "jsonwebtoken";
import validateToken from "../../../../validateToken";

export default async function loginUser(email?: string, password?: string, token?: string) {
    const { SECRET_KEY } = process.env
    if (!token) {
        if (!email || !password) throw new Error('Email y contraseña son obligatorios');
        const user: any = await User.findOne({ where: { email } });
        if (!user) throw new Error('Usuario no encontrado');
        if (!bcrypt.compareSync(password, user.password)) throw new Error('Contraseña incorrecta');
        if (SECRET_KEY) {
            const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '7d' })
            jwt.verify(token, SECRET_KEY)
            return { user, token };
        }
    } else {
        let emailFromToken: string | undefined;
        const data = validateToken(token)
        if (typeof data === "string") {
            throw new Error('Token inválido');
        } else {
            emailFromToken = data.email;
        }
        const user: any = await User.findOne({ where: { email: emailFromToken } });
        if (!user) throw new Error('Usuario no encontrado');
        return user
    }
}