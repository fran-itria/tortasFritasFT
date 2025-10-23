import { useState } from "react";
import { Products } from "./useProductsHook";


export default function useModal() {

    const [modal, setModal] = useState<boolean>(false)
    const [product, setProduct] = useState<Products | undefined>(undefined)

    function openModal(p?: Products) {
        setProduct(p)
        setModal(true)
    }

    function closeModal() {
        setModal(false)
        setProduct(undefined)
    }

    return { modal, product, openModal, closeModal }
}