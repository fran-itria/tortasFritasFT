import jwt, { JwtPayload } from "jsonwebtoken";

export default function validateToken(authorization: string): JwtPayload | string {
    const { SECRET_KEY } = process.env
    if (!authorization || typeof authorization !== "string") throw new Error('No se encuentra autorizado')
    if (!SECRET_KEY) throw new Error('No se encuentra la clave secreta')
    return jwt.verify(authorization, SECRET_KEY)
}