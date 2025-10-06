import { Product } from "../../../../sequelize/db";
import { UpdateData } from "./types";

export default async function updateProduct({
    id,
    amount,
    description,
    image,
    name,
    soldOut,
    varity
}: UpdateData) {
    console.log({ id, soldOut })
    if (!id) throw new Error("Falta el id")
    const [product] = await Product.update(
        {
            amount,
            description,
            image,
            name,
            soldOut,
            varity
        },
        {
            where: { id }
        }
    )
    if (product === 0) {
        throw new Error("No se encuentra el producto")
    }
    const productUpdated = await Product.findByPk(id)
    return productUpdated
}