import bcrypt from "bcrypt";
import getOneUser from "../find/getOneUser";
import { UpdateUserProps } from "./types";


export default async function updateUser({
    id,
    name,
    surname,
    email,
    phone,
    admin,
    password,
    active
}: UpdateUserProps) {
    if (!id) throw new Error('ID de usuario es obligatorio');
    if (password) {
        password = bcrypt.hashSync(password, 10);
    }
    const user = await getOneUser(id)
    await user.update(
        {
            name,
            surname,
            email,
            phone,
            password,
            active,
            admin
        },
        {
            where: {
                id
            }
        },
    )
    if (user) return user
    else throw new Error('No se pudo actualizar el usuario')
}