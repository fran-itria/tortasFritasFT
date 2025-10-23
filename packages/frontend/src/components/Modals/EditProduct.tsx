'use client'
import useThemeState from "@/zustand/theme"
import { Products } from "hooks/useProductsHook"
import { Dispatch, SetStateAction, useState } from "react"
import { InputFieldNames, submit, updateProductFunction, updateVarityFunction } from "./services/updateProduct"
import { TrashIcon } from "../Icons"
import Loading from "../loading"

export default function EditProduct({ product, closeModal, setProducts }: {
    product: Products | undefined,
    closeModal: () => void
    setProducts: Dispatch<SetStateAction<Products[]>>
}) {
    const { theme } = useThemeState(state => state)
    const [updateProduct, setUpdateProduct] = useState<Products | undefined>(product)
    const [varity, setVarity] = useState<{ id: string, name: string, soldOut: boolean }[]>(product?.varity || [])
    const [loading, setLoading] = useState(false)
    return (
        <div className="top-47 right-180 max-xs:top-30 max-xs:right-3 flex flex-col items-center">
            <div className={`${theme === 'dark' ? 'bg-dark-tertiary' : 'bg-light-secondary'} p-4 rounded-lg border`}>
                <p className="text-xl font-bold w-full text-center mb-3">Editando producto</p>
                <form className="flex flex-col gap-5" onSubmit={(e) => submit({ setProducts, closeModal, setLoading, e, products: updateProduct, varity })}>
                    <div>
                        <label className="font-bold mr-2">Producto:</label>
                        <input
                            name={InputFieldNames.NAME}
                            className={`
                                ${theme === 'dark' ? 'bg-dark-input text-input text-black' : 'bg-light-input text-white'} 
                                rounded-lg px-2
                                font-bold
                            `}
                            type="text" defaultValue={product?.name}
                            onChange={(e) => updateProductFunction({ e, setUpdateProduct })}
                        />
                    </div>
                    <div className="flex items-start">
                        <label className="mr-2 font-bold">Descripción:</label>
                        <textarea
                            name={InputFieldNames.DESCRIPTION}
                            className={`
                                ${theme === 'dark' ? 'bg-dark-input text-input text-black' : 'bg-light-input text-white'}
                                rounded-lg
                                font-bold
                                px-2
                            `}
                            defaultValue={product?.description || ''}
                            onChange={(e) => updateProductFunction({ e, setUpdateProduct })}
                        />
                    </div>
                    <div className="flex flex-col items-between">
                        <label className="font-bold">Variedad:</label>
                        <div className="grid grid-cols-2 gap-2">
                            {varity?.map((current, index) => (
                                <div className="flex" key={current.id}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newVarity = varity?.filter((element) => element.id !== current.id)
                                            setVarity(newVarity)
                                        }}
                                        className="mr-2"
                                    >
                                        <TrashIcon />
                                    </button>
                                    <input
                                        name='varity'
                                        className={`
                                        ${theme === 'dark' ? 'bg-dark-input text-input text-black' : 'bg-light-input text-white'}
                                        rounded-lg
                                        font-bold
                                        w-40 text-center
                                    `}
                                        defaultValue={varity[index].name || ''}
                                        type="text"
                                        onChange={(e) => updateVarityFunction({ e, setVarity, index })}
                                    >
                                    </input>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => setVarity((prev) => {
                                return [...prev, { id: crypto.randomUUID(), name: '', soldOut: false }]
                            })}
                            className=" mt-2 w-full bg-dark-background-button rounded-lg font-bold">
                            + Variedad
                        </button>
                    </div>
                    <div>
                        <label className="font-bold mr-2">Precio:</label>
                        <input
                            name={InputFieldNames.AMOUNT}
                            className={`
                                ${theme === 'dark' ? 'bg-dark-input text-input text-black' : 'bg-light-input text-white'}
                                rounded-lg
                                font-bold
                                px-2
                            `}
                            type="number"
                            defaultValue={product?.amount}
                            onChange={(e) => updateProductFunction({ e, setUpdateProduct })}
                        />
                    </div>
                    <div>
                        <label className="font-bold mr-2">Imagen:</label>
                        <input
                            name={InputFieldNames.IMAGE}
                            type="file"
                            className="flex bg-dark-background-button rounded-lg px-2"
                        />
                    </div>
                    <div>
                        <label className="font-bold mr-2">Producto agotado:</label>
                        <input
                            name='soldOut'
                            type="checkbox"
                            defaultChecked={product?.soldOut}
                            onChange={(e) => updateProductFunction({ e, setUpdateProduct })}
                        />
                    </div>
                    <div className="flex flex-col justify-around h-20">
                        <button
                            type="submit"
                            className="w-full bg-dark-background-button rounded-lg px-2">
                            Guardar cambios
                        </button>
                        <button
                            type="button"
                            className="
                                w-full border 
                                border-red-500 
                                font-bold 
                                rounded-lg
                                px-2
                                text-red-500
                                hover:bg-red-500
                                hover:text-white
                                transition
                            "
                            onClick={() => closeModal()}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div >
            {loading && <Loading text="Actualizando producto" />}
        </div >
    )
}