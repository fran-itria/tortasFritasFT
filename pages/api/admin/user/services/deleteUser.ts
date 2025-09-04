import { User } from "../../../../sequelize/db";
import updateUser from "../update/updateUser";


export default async function deleteUser(id: string) {
    const user = await updateUser({ id, active: false });
    if (user) return true
    else throw new Error("No se pudo eliminar el usuario")
}