import useThemeState from "@/zustand/theme"
import { CartIconPlus, PencilIcon } from "../Icons"
import Link from "next/link"
import { useUserState } from "@/zustand/userState"
import { alerts } from "@/alerts/alerts"
import { Theme } from "@/utils/constTheme"
import Image from "next/image"

interface Props {
    isAdmin: boolean
    index: { current: number, total: number }
    id: string
    image: string | File | undefined
    name: string,
    description?: string
    varity?: { id: string, name: string, soldOut: boolean }[]
    amount: number
    soldOut: boolean
    active: number
}

export default function ProductCard({ isAdmin, id, index, image, name, description, varity, amount, soldOut, active }: Props) {
    const { theme } = useThemeState(state => state)
    const { user } = useUserState(state => state)

    const buttonFunction = () => {
        if (!user) {
            alerts('error', theme, 'Debes estar logeado para agregar productos al carrito')
        } else if (user && !user.admin) {
            alerts('success', theme, 'Producto agregado al carrito')
        }
    }
    return (
        <div className={`
            flex flex-col justify-center items-center
            p-5
            ${index.current == (index.total - 1) && index.current % 2 == 0 && !isAdmin && 'col-span-2'}
        `}>
            <div className={`
                z-0
                ${theme == Theme.DARK ?
                    'bg-[#00011A] shadow-[7px_7px_7px_rgba(255,255,255,0.40)]'
                    :
                    'bg-white shadow-[7px_7px_7px_rgba(0,0,0,0.70)]'
                }
                ${soldOut && !isAdmin && 'blur-[2px]'}
                flex flex-col justify-between items-center
                rounded-xl
                w-60 h-90
                ${index.current == (index.total - 1) && index.current % 2 == 0 && (!isAdmin || !user) ? 'max-xs:w-50' : 'max-xs:w-full'}
                shadow-xl/70
                relative
            `}>
                {soldOut && !isAdmin ?
                    <p className="z-10 text-white absolute top-42 bg-linear-to-r from-[#A80000] to-[#3C0000] w-full text-center">Sin stock</p>
                    :
                    !active && isAdmin &&
                    <p className="z-10 text-white absolute top-42 bg-linear-to-r from-[#A80000] to-[#3C0000] w-full text-center">No disponible</p>
                }
                <Image
                    width={1}
                    height={1}
                    src={typeof image === "string" ? image : URL.createObjectURL(image as Blob)}
                    alt={name}
                    unoptimized={true}
                    className="
                        w-60 h-40
                        max-xs:w-full
                        rounded-t-xl
                "/>
                <p className="font-bold text-xl max-xs:text-lg">{name}</p>
                <p className={`
                    ${theme == Theme.DARK ? 'dark:text-dark-text' : 'text-gray-500'} text-center
                    px-2 
                    max-xs:text-sm
                `}>
                    {description}
                </p>
                {varity && varity.length > 0 && (
                    <ul className={`${varity.length > 4 && "grid grid-cols-2"} list-disc list-inside`}>
                        {varity.map((v) => (
                            <li
                                key={v.id}
                                className={`
                                    first-letter:uppercase 
                                    ${theme == Theme.DARK ? 'dark:text-dark-text' : 'text-gray-500'} 
                                    font-bold 
                                    text-center text-sm
                                `}
                            >
                                {v.name}
                            </li>
                        ))}
                    </ul>
                )}
                <p className="font-bold text-xl max-xs:text-lg">${amount}</p>
                <button
                    disabled={(user && soldOut)}
                    onClick={() => {
                        if (!isAdmin) buttonFunction()
                    }}
                    className={`
                        flex items-center justify-around
                        h-12
                        w-full
                        ${theme == Theme.DARK ?
                            'bg-dark-background-button' :
                            'bg-linear-to-r from-[#00A900] to-[#006100]'
                        }
                        ${!user ? 'opacity-50' : user && !isAdmin && 'opacity-100'}
                        rounded-b-xl 
                        text-white
                        text-xl
                        max-xs:text-sm
                        font-bold
                `}
                >
                    {!isAdmin ?
                        <>
                            <CartIconPlus />
                            <p>Agregar producto</p>
                        </>
                        :
                        <div className="w-full flex justify-around">
                            <Link
                                href={`/product/${id}`}
                                className={`
                                    flex items-center justify-around
                                    h-12
                                    w-full
                                    ${theme == Theme.DARK ?
                                        'bg-dark-background-button' :
                                        'bg-linear-to-r from-[#00A900] to-[#006100]'
                                    }
                                    ${!isAdmin && 'opacity-50'}
                                    rounded-b-xl 
                                    text-white
                                    text-xl
                                    max-xs:text-sm
                                    font-bold
                                `}
                            >
                                <PencilIcon />
                                <p>Editar producto</p>
                            </Link>
                        </div>
                    }
                </button>
            </div>
        </div>
    )
}