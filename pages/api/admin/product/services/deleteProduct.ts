import { Product } from "../../../../sequelize/db"

export default async function deleteProduct(id: string) {
    if (!id) throw new Error("Falta el id")
    const deleteProduct = await Product.destroy({ where: { id } })
    if (deleteProduct) return
    throw new Error("No se pudo eliminar el producto")
}