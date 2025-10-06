import updateUser from "../../../user/services/update/updateUser";


export default async function deleteUser(id: string) {
    const user = await updateUser({ id, active: false });
    if (user) return true
    else throw new Error("No se pudo eliminar el usuario")
}