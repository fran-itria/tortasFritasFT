import { Product } from "../../../../sequelize/db";
import { BulkCreateData } from "./types";

export default async function bulkCreate(products: BulkCreateData) {
    const createdProducts = await Product.bulkCreate(products as any);
    if (createdProducts) return createdProducts;
    else throw new Error("No se pudieron crear los productos");
}