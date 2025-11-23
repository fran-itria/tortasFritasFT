import { productsServiceApi } from "@/services/api";
import { constLoader } from "@/utils/constLoader";
import { useEffect, useState } from "react";

export interface Products {
    id: string
    name: string
    amount: number
    description?: string
    varity?: { id: string, name: string, soldOut: boolean }[]
    soldOut: boolean
    active: number
    image?: File | string
}

export default function useProductsHook() {
    const [products, setProducts] = useState<Products[]>([])
    const [loader, setLoader] = useState<string>('');
    useEffect(() => {
        (async () => {
            setLoader(constLoader.getProducts)
            const response = await productsServiceApi.getAll()
            try {
                if (response.status == 200) {
                    setProducts(response.data)
                    setLoader('')
                }
            } catch (error) {
                setLoader('')
                console.error("Error fetching products:", error)
            }
        })()
    }, [])

    return { products, setProducts, loader, setLoader }
}