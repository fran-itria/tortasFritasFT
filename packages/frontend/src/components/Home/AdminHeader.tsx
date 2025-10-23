import useThemeState from "@/zustand/theme"

export default function AdminHeader() {
    const { theme } = useThemeState(state => state)
    return (
        <div className="flex justify-around p-5 max-xs:grid max-xs:grid-cols-2 max-xs:gap-2">
            <button className={`
                ${theme === "dark" ?
                    "bg-dark-background-button text-dark-text"
                    :
                    "bg-light-background-button text-light-secondary"
                }
                p-2
                px-4
                rounded-lg
                font-bold
            `}>
                Editar horarios
            </button>
            <button className={`
                ${theme === "dark" ?
                    "bg-dark-background-button text-dark-text"
                    :
                    "bg-light-background-button text-light-secondary"
                }
                p-2
                px-4
                rounded-lg
                font-bold
            `}>
                Lista de usuarios
            </button>
            <button className={`
                ${theme === "dark" ?
                    "bg-dark-background-button text-dark-text"
                    :
                    "bg-light-background-button text-light-secondary"
                }
                max-xs:col-span-2
                p-2
                px-4
                rounded-lg
                font-bold
            `}>
                Pedidos
            </button>
        </div>
    )
}