import { Options } from "../../../../sequelize/db"

interface Body {
    ordersActive?: boolean
    openingHours?: string[]
    id: string
}

export default async function updateOptions(body: Body) {
    const { ordersActive, openingHours, id } = body
    if (!id) throw new Error("Falta el id")
    const [affectedRows] = await Options.update(
        {
            ordersActive,
            openingHours
        },
        {
            where: {
                id: id
            }
        }
    )
    if (affectedRows === 0) {
        throw new Error("No se pudo actualizar la configuración")
    }
    return { message: "Configuración actualizada correctamente", affectedRows }
}