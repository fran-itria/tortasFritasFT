import { Options } from "../../../sequelize/db"

export default async function deleteOptions(id: string) {
    if (!id) throw new Error("Falta el id")
    const options = await Options.destroy({
        where: { id }
    })
    if (options) return
    throw new Error("No se pudo eliminar la configuración")
}
