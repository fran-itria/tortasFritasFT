import { alerts } from "@/alerts/alerts";
import { firebaseAuth, storage } from "@/firebase/firebase";
import { productsServiceApi } from "@/services/api";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Products } from "hooks/useProductsHook";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

export enum InputFieldNames {
    NAME = 'name',
    DESCRIPTION = 'description',
    AMOUNT = 'amount',
    IMAGE = 'image',
    SOLD_OUT = 'soldOut',
}

interface updateProductsProps {
    setProduct: Dispatch<SetStateAction<Products | undefined>>
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
    product: Products | undefined,
    varity: {
        id: string;
        name: string;
        soldOut: boolean;
    }[]
    image: string | File | undefined
    setLoading: Dispatch<SetStateAction<boolean>>
    router: AppRouterInstance
}

export function updateProductFunction({ e, setProduct }: updateProductsProps) {
    const name = e.target.name;
    let value
    if (e.target.name == InputFieldNames.SOLD_OUT) {
        value = (e.target as HTMLInputElement).checked
    } else value = e.target.value;

    setProduct((prevProduct) => {
        if (!prevProduct) return undefined;
        return { ...prevProduct, [name]: value }
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

export async function submit({ e, product, varity, image, setLoading, router }: submitProps) {
    e.preventDefault()
    setLoading(true)
    try {
        if (image && product && image != product.image) {
            const storageRef = ref(storage, (image as File).name)
            await uploadBytes(storageRef, image as File)
            const urlImage = await getDownloadURL(storageRef)
            product.image = urlImage
        }
        if (product) {
            product.varity = varity
            await productsServiceApi.update(product)
            router.back()
        }
    }
    catch (error) {
        setLoading(false)
    }
}   