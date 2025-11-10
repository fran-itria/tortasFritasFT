import useThemeState from "@/zustand/theme";
import { PersonIcon } from "../Icons";
import { useState } from "react";
import { useUserState } from "@/zustand/userState";


export default function ButtonPerson() {
    const { theme } = useThemeState(state => state);
    const [openMenu, setOpenMenu] = useState(false);
    const { setUser } = useUserState(state => state);
    const logout = () => {
        localStorage.removeItem('token');
        setUser(undefined)
    }
    return (
        <div className="flex flex-col relative">
            <button onClick={() => setOpenMenu(!openMenu)}>
                <PersonIcon theme={theme} />
            </button>
            {openMenu && (
                <div className="
                        absolute 
                        flex flex-col 
                        top-10 right-0 
                        w-30
                        bg-dark-background-button
                        rounded-lg
                    ">
                    <button className="border-2 border-white rounded-t-lg px-2">Mi Perfil</button>
                    <button onClick={logout} className="border-2 border-white rounded-b-lg px-2">Cerrar Sesión</button>
                </div>
            )}
        </div>
    )
}