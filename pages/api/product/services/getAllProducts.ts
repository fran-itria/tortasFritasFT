import { Product } from "../../../sequelize/db"


export default async function getAllProducts() {
    const products = await Product.findAll()
    if (products.length > 0) return products
    else throw new Error('No hay productos registrados')
}