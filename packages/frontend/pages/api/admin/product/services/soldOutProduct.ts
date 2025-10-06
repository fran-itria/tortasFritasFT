import updateProduct from "./updateProduct"

export default async function soldOutProduct(id: string) {
    const product = await updateProduct({ id, soldOut: true })
    if (!product) throw new Error("No se pudo eliminar el producto")
}