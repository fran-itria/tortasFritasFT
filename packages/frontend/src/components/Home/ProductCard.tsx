import useThemeState from "@/zustand/theme"
import { CartIconPlus } from "../Icons"
import { useUserState } from "@/zustand/userState"
import { alerts } from "@/alerts/alerts"


interface Props {
    index: { current: number, total: number }
    image?: string
    name: string,
    description?: string
    varity?: { name: string, soldOut: boolean }[]
    amount: number
}

export default function ProductCard({ index, image, name, description, varity, amount }: Props) {
    const { user } = useUserState(state => state)
    const { theme } = useThemeState(state => state)
    console.log(index)
    return (
        <div className={`
            flex flex-col justify-center items-center
            p-5
            ${index.current == (index.total - 1) && index.current % 2 == 0 ? 'col-span-2' : ''}
        `}>
            <div className={`
                ${theme == 'dark' ?
                    'bg-[#00011A] shadow-[7px_7px_7px_rgba(255,255,255,0.40)]'
                    :
                    'bg-white shadow-[7px_7px_7px_rgba(0,0,0,0.70)]'
                }
                flex flex-col justify-between items-center
                rounded-xl
                w-60 h-90
                max-xs:w-45
                shadow-xl/70
            `}>
                <img src={image} alt={name} className="
                    w-60 h-40
                    max-xs:w-45 
                    rounded-t-xl
                "/>
                <p className="font-bold text-xl max-xs:text-lg">{name}</p>
                <p className={`
                    ${theme == 'dark' ? 'dark:text-dark-text' : 'text-gray-500'} text-center
                    px-2 
                    max-xs:text-sm
                `}>
                    {description}
                </p>
                {varity && varity.length > 0 && (
                    <ul className={`${varity.length > 4 && "grid grid-cols-2"} list-disc list-inside`}>
                        {varity.map((v) => (
                            <li className={`
                                first-letter:uppercase 
                               ${theme == 'dark' ? 'dark:text-dark-text' : 'text-gray-500'} 
                               font-bold 
                                text-center text-sm
                            `}>{v.name}</li>
                        ))}
                    </ul>
                )}
                <p className="font-bold text-xl max-xs:text-lg">${amount}</p>
                <button
                    className={`
                        flex items-center justify-around
                        h-12
                        w-full
                        ${theme == 'dark' ?
                            'bg-dark-background-button' :
                            'bg-linear-to-r from-[#00A900] to-[#006100]'
                        }
                        ${!user && 'opacity-50'}
                        rounded-b-xl 
                        text-white
                        text-xl
                        max-xs:text-sm
                        font-bold
                `}
                    onClick={() => {
                        if (!user) {
                            alerts('error', theme, 'Debes estar logeado para hacer pedidos')
                        }
                    }}
                >
                    <CartIconPlus />
                    <p>Agregar producto</p>
                </button>
            </div>
        </div>
    )
}