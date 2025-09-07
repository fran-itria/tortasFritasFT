import { Product } from "../../../../sequelize/db";
import { ProductData } from "./types";

export default async function createProduct({ amount, name, description, soldOut, varity, image }: ProductData) {
    if (!name || !amount) throw new Error("Faltan datos obligatorios")
    const newProduct = await Product.create({ amount, name, description, soldOut, varity, image })
    if (newProduct) return newProduct
    else throw new Error("No se pudo crear el producto")
}