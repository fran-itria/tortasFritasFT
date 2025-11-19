import { Products } from "hooks/useProductsHook";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export enum InputFieldNames {
    NAME = 'name',
    DESCRIPTION = 'description',
    AMOUNT = 'amount',
    IMAGE = 'image',
    SOLD_OUT = 'soldOut',
    ACTIVE = 'active',
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

export function changeInputs({ e, setProduct }: updateProductsProps) {
    const name = e.target.name;
    let value
    if (name == InputFieldNames.SOLD_OUT || name == InputFieldNames.ACTIVE) {
        value = (e.target as HTMLInputElement).checked
        if (name == InputFieldNames.ACTIVE) value = value ? 1 : 0
    } else value = e.target.value;

    setProduct((prevProduct) => {
        const newProduct: Products = {
            id: '',
            name: '',
            description: '',
            amount: 0,
            image: '',
            soldOut: false,
            varity: [],
            active: 1,
        };
        if (!prevProduct) return { ...newProduct, [name]: value };
        return { ...prevProduct, [name]: value }
    })
}

export function changeVarity({ e, setVarity, index }: updateVarityProps) {
    const value = e.target.value
    setVarity((prev) => {
        const newVarity = [...prev];
        newVarity[index] = { ...newVarity[index], name: value };
        return newVarity;
    })
}  