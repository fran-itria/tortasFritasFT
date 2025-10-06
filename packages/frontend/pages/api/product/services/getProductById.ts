import { Product } from "../../../sequelize/db"


export default async function getProducgtById(id: string) {
    if (!id) throw new Error("Falta el id")
    const product = await Product.findByPk(id)
    if (!product) throw new Error("No se encuentra el producto")
    return product
}