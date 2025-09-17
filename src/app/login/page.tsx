'use client'

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import logoDark from "../../assets/logoDark.png";
import logoLight from "../../assets/logoLight.png";
import { ThemeToggle } from "../../components/ThemeToggle";
import { GoogleIcon } from "@/components/Icons";

export default function Login() {
    const [mounted, setMounted] = useState(false)
    const { theme } = useTheme();

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen relative">
            <ThemeToggle />
            <img
                src={theme === 'dark' ? logoDark.src : logoLight.src}
                alt="Logo"
                className="rounded-full w-56 h-auto mb-8"
            />
            <div className={`
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
                <form className={`
                    rounded-lg 
                    flex 
                    flex-col
                    items-center 
                    gap-6
                `}>
                    <p className="font-bold text-xl">Inicio de sesión</p>
                    <div className="w-full flex flex-col">
                        <label className={`
                            font-bold
                            ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}
                        `}>
                            Usuario:
                        </label>
                        <input className={`
                            ${theme === 'dark' ? 'bg-dark-input' : 'bg-light-input'} 
                            rounded-lg`
                        }>
                        </input>
                    </div>
                    <div className="w-full flex flex-col">
                        <label className={`
                            font-bold
                            ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}
                        `}>
                            Contraseña:
                        </label>
                        <input className={`
                            ${theme === 'dark' ? 'bg-dark-input' : 'bg-light-input'} 
                            rounded-lg`
                        }>
                        </input>
                    </div>
                    <div className="flex flex-col items-center">
                        <button className={`
                            buttonForm 
                            ${theme === 'dark' ?
                                'bg-dark-background-button text-dark-text'
                                :
                                'bg-light-background-button text-light-primary'
                            }
                        `}>
                            Iniciar sesión
                        </button>
                        <button className="mt-3">
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
                                <p className="ml-2">Iniciar sesión con Google</p>
                            </div>
                        </button>
                    </div>
                </form>
                {/* <div className="flex flex-col items-center justify-between h-20 w-full"> */}
                <p className={`font-bold ${theme == 'dark' ? 'text-dark-text' : 'text-light-text'}`}>¿Ha olvidado su contraseña?</p>
                <div className="border w-full"></div>
                <button className={`
                            buttonForm 
                            ${theme === 'dark' ?
                        'bg-dark-background-button text-dark-text'
                        :
                        'bg-light-background-button text-light-primary'
                    }
                            `}>
                    Registrarse
                </button>
                {/* </div> */}
            </div>
        </div>
    )
}