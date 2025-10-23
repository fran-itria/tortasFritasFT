import { alerts } from "@/alerts/alerts";
import { productsServiceApi } from "@/services/api";
import { Products } from "hooks/useProductsHook";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

export enum InputFieldNames {
    NAME = 'name',
    DESCRIPTION = 'description',
    AMOUNT = 'amount',
    IMAGE = 'image',
    SOLD_OUT = 'soldOut',
}

interface updateProductsProps {
    setUpdateProduct: Dispatch<SetStateAction<Products | undefined>>
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
}

interface updateVarityProps {
    setVarity: Dispatch<SetStateAction<{
        id: string;
        name: string;
        soldOut: boolean;
    }[]>>
    index: number
    e: ChangeEvent<HTMLInputElement>
}

interface submitProps {
    e: FormEvent<HTMLFormElement>
    products: Products | undefined,
    varity: {
        id: string;
        name: string;
        soldOut: boolean;
    }[]
    setLoading: Dispatch<SetStateAction<boolean>>
    closeModal: () => void
    setProducts: Dispatch<SetStateAction<Products[]>>
}

export function updateProductFunction({ e, setUpdateProduct }: updateProductsProps) {
    const name = e.target.name;
    let value
    if (e.target.name == InputFieldNames.SOLD_OUT) {
        value = (e.target as HTMLInputElement).checked
    } else value = e.target.value;

    setUpdateProduct((prevProducts) => {
        if (!prevProducts) return undefined;
        return { ...prevProducts, [name]: value }
    })
}

export function updateVarityFunction({ e, setVarity, index }: updateVarityProps) {
    const value = e.target.value
    setVarity((prev) => {
        const newVarity = [...prev];
        newVarity[index] = { ...newVarity[index], name: value };
        return newVarity;
    })
}

export async function submit({ e, products, varity, setLoading, closeModal, setProducts }: submitProps) {
    e.preventDefault()
    setLoading(true)
    if (products) {
        products.varity = varity
        try {
            await productsServiceApi.update(products)
            const response = await productsServiceApi.getAll()
            if (response.status == 200) {
                setProducts(response.data)
                setLoading(false)
                closeModal()
            }
        } catch (error) {
            setLoading(false)
        }
    }
}   