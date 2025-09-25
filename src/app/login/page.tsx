'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import logoDark from "../../assets/logoDark.png";
import logoLight from "../../assets/logoLight.png";
import { ThemeToggle } from "../../components/ThemeToggle";
import { GoogleIcon, LoadingIcon } from "@/components/Icons";
import useThemeState from "@/zustand/theme";
import { continueWithGoogle } from "./services";
import { useUserState } from "@/zustand/userState";
import axios from "axios";
import { alerts } from "@/alerts/alerts";
import Loading from "@/components/loading";

export default function Login() {
    const router = useRouter()
    const theme = useThemeState((state: { theme: string }) => state.theme)
    const setUser = useUserState(state => state.setUser)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            (async () => {
                try {
                    const user = await axios.get('/api/user/loginWithToken', {
                        headers: {
                            Authorization: token
                        }
                    })
                    if (user) {
                        setUser(user.data)
                        setLoading(false)
                        router.push('/')
                    }
                } catch (error) {
                    alerts('error', theme, 'Sesión expirada, por favor inicia sesión nuevamente')
                }
            })()
        }
    }, [])
    return (
        <>
            <div className=" flex flex-col justify-center items-center h-screen relative">
                <img
                    src={theme === 'dark' ? logoDark.src : logoLight.src}
                    alt="Logo"
                    className={`${loading && 'blur-sm'} rounded-full w-56 h-auto mb-8`}
                />
                {loading &&
                    <Loading text="Iniciando sesión..." />
                }
                <div className={`
                    ${loading && 'blur-sm'}
                    bg-linear-to-b 
                    ${theme === 'dark' ? 'from-dark-secondary to-dark-tertiary shadow-white' : 'from-light-secondary to-light-tertiary shadow-black'}
                    rounded-lg 
                    flex 
                    flex-col
                    items-center
                    p-6
                    gap-6
                    shadow-[5px_5px_4px]
                `}>
                    <button
                        className="w-full mt-3"
                        onClick={async () => await continueWithGoogle({ theme, setUser, router })}
                    >
                        <div className={`
                                flex 
                                items-center 
                                justify-center
                                rounded-[5px]
                                pt-[3px]
                                pb-[3px]
                                px-2
                                font-bold
                                ${theme == 'dark' ? 'bg-dark-input text-[#333333]' : 'bg-light-input text-light-primary'}
                            `}>
                            <GoogleIcon theme={theme} />
                            <p className="ml-2">Continuar con Google</p>
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}