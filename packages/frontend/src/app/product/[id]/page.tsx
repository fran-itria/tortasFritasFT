'use client'
import useThemeState from "@/zustand/theme"
import { Products } from "hooks/useProductsHook"
import { useEffect, useState } from "react"
import { InputFieldNames, changeInputs, changeVarity } from "../../services/inputsFunctions"
import { TrashIcon } from "../../../components/Icons"
import Loading from "../../../components/loading"
import { useParams, useRouter } from "next/navigation"
import { productsServiceApi } from "@/services/api"
import Link from "next/link"
import { submit, SubmitFormCases } from "@/app/services/submitForm"

export default function EditProduct() {
    const { theme } = useThemeState(state => state)
    const [product, setProduct] = useState<Products | undefined>(undefined)
    const [image, setImage] = useState<File | string | undefined>(undefined)
    const [varity, setVarity] = useState<{ id: string, name: string, soldOut: boolean }[]>([])
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const router = useRouter()

    useEffect(() => {
        (async () => {
            const res = await productsServiceApi.getOneProduct(id as string)
            console.log(res.data)
            setProduct(res.data)
            setImage(res.data.image)
            setVarity(res.data.varity || [])
        })()
    }, [id])

    return (
        <div className="pb-5 flex flex-col items-center">
            <div className={`${theme === 'dark' ? 'bg-dark-tertiary' : 'bg-light-secondary'} p-4 rounded-lg border`}>
                <div className="flex justify-between h-10 items-center mb-3">
                    <Link href={'/'} className={`
                        ${theme == 'dark' ?
                            'bg-dark-background-button text-dark-text'
                            :
                            'bg-light-background-button text-light-secondary'}
                            px-2 rounded-lg
                            h-fit
                        `}
                    >
                        Volver
                    </Link>
                    <p className="text-xl font-bold w-full text-center">Editando el producto: {product?.name}</p>
                </div>
                <form className="flex flex-col gap-5" onSubmit={(e) => submit({ setLoading, e, product, varity, image, router, submitCase: SubmitFormCases.UPDATE })}>
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
                            onChange={(e) => changeInputs({ e, setProduct })}
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
                            onChange={(e) => changeInputs({ e, setProduct })}
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
                                        onChange={(e) => changeVarity({ e, setVarity, index })}
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
                            className={`mt-2 w-full ${theme === 'dark' ? 'bg-dark-background-button text-dark-text' : 'bg-light-background-button text-light-primary'} rounded-lg font-bold`}>
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
                            onChange={(e) => changeInputs({ e, setProduct })}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <label className="font-bold mr-2 w-full">Imagen:</label>
                        <input
                            name={InputFieldNames.IMAGE}
                            type="file"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0] : undefined)}
                            className={`
                                ${theme === 'dark' ? 'bg-dark-background-button text-dark-text' : 'bg-light-background-button text-light-primary'} 
                                rounded-lg
                                w-full
                                px-2`}
                        />
                        {product?.image &&
                            <img src={typeof image == "string" ? image : URL.createObjectURL(image as File)} className="
                                w-20 h-auto 
                                max-xs:w-45
                                mt-2"
                            />
                        }
                    </div>
                    <div>
                        <label className="font-bold mr-2">Producto agotado:</label>
                        <input
                            name={InputFieldNames.SOLD_OUT}
                            type="checkbox"
                            className={`${theme == "dark" ? "accent-dark-background-button" : "accent-light-background-button"}`}
                            checked={product?.soldOut ? true : false}
                            onChange={(e) => changeInputs({ e, setProduct })}
                        />
                    </div>
                    <div>
                        <label className="font-bold mr-2">Mostrar en el catalogo:</label>
                        <input
                            name={InputFieldNames.ACTIVE}
                            type="checkbox"
                            className={`${theme == "dark" ? "accent-dark-background-button" : "accent-light-background-button"}`}
                            checked={product?.active ? true : false}
                            onChange={(e) => changeInputs({ e, setProduct })}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full ${theme === 'dark' ? 'bg-dark-background-button text-dark-text' : 'bg-light-background-button text-light-primary'} rounded-lg px-2`}>
                        Guardar cambios
                    </button>
                </form>
            </div >
            {loading && <Loading text="Actualizando producto" />}
        </div >
    )
}