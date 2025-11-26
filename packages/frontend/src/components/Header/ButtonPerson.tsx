import useThemeState from "@/zustand/theme";
import { PersonIcon } from "../Icons";
import { useState } from "react";
import { useUserState } from "@/zustand/userState";
import { useRouter } from "next/navigation";

export default function ButtonPerson() {
    const { theme } = useThemeState(state => state);
    const [openMenu, setOpenMenu] = useState(false);
    const { setUser } = useUserState(state => state);
    const router = useRouter()
    const logout = () => {
        localStorage.removeItem('token');
        setUser(undefined)
        router.push('/')
    }
    return (
        <div className="flex flex-col relative w-full flex justify-center">
            <button onClick={() => setOpenMenu(!openMenu)} aria-label="person" className="w-full flex justify-center">
                <PersonIcon theme={theme} />
            </button>
            {openMenu && (
                <div className={`
                        absolute 
                        flex flex-col 
                        top-10 right-0 
                        w-30
                        font-medium
                        ${theme == "dark" ? "bg-dark-input text-black" : "bg-light-input text-light-primary"}
                        rounded-lg
                    `}>
                    <button className={`border-b-2 rounded-t-lg px-2`} aria-label="perfil">Mi Perfil</button>
                    <button onClick={logout} className={`rounded-b-lg px-2`} aria-label="ñgout session">Cerrar Sesión</button>
                </div>
            )}
        </div>
    )
}