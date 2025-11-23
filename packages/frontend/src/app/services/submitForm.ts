import { storage } from "@/firebase/firebase";
import { productsServiceApi } from "@/services/api";
import { constLoader } from "@/utils/constLoader";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Products } from "hooks/useProductsHook";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, FormEvent, SetStateAction } from "react";

export enum SubmitFormCases {
    CREATE = 'create',
    UPDATE = 'update'
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
    setLoader: Dispatch<SetStateAction<string>>
    router: AppRouterInstance
    submitCase: SubmitFormCases.CREATE | SubmitFormCases.UPDATE
}

export async function submit({ e, product, varity, image, setLoader, router, submitCase }: submitProps) {
    e.preventDefault()
    setLoader(submitCase === SubmitFormCases.CREATE ? constLoader.createProduct : constLoader.updateProduct)
    try {
        if (image && product && image != product.image) {
            const storageRef = ref(storage, (image as File).name)
            await uploadBytes(storageRef, image as File)
            const urlImage = await getDownloadURL(storageRef)
            product.image = urlImage
        }
        if (product) {
            switch (submitCase) {
                case SubmitFormCases.UPDATE:
                    product.varity = varity
                    await productsServiceApi.update(product)
                    router.back()
                    break;
                case SubmitFormCases.CREATE:
                    product.varity = varity
                    await productsServiceApi.create(product)
                    router.back()
                    break;
                default:
                    window.alert('Caso no manejado');
                    router.back()
                    break;
            }
        }
    }
    catch (_error) {
        setLoader('')
    }
} 