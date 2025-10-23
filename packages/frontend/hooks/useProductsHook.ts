import { productsServiceApi } from "@/services/api";
import { useEffect, useState } from "react";

export interface Products {
    id: string
    name: string
    amount: number
    description?: string
    varity?: { id: string, name: string, soldOut: boolean }[]
    soldOut: boolean
    image?: string
}

export default function useProductsHook() {
    const [products, setProducts] = useState<Products[]>([])
    useEffect(() => {
        (async () => {
            const response = await productsServiceApi.getAll()
            try {
                if (response.status == 200) {
                    setProducts(response.data)
                }
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        })()
    }, [])

    return { products, setProducts }
}