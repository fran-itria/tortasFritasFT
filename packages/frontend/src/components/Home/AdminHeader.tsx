import useThemeState from "@/zustand/theme"
import { useState } from "react"
import { EditHours } from "./EditHours"
import Link from "next/link"

export default function AdminHeader() {
    const { theme } = useThemeState(state => state)
    const [open, setOpen] = useState(false)
    return (
        <div className="flex justify-around p-5 max-xs:grid max-xs:grid-cols-2 max-xs:gap-2 text-center">
            <Link
                href={"/"}
                className={`
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
                Inicio
            </Link>
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
            `}
                onClick={() => setOpen(!open)}
            >
                Editar horarios
            </button>
            <Link
                href={"/users"}
                className={`
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
            </Link>
            <Link
                href={'/orders'}
                className={`
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
                Pedidos
            </Link>
            {open && <EditHours setOpen={setOpen} />}
        </div>
    )
}