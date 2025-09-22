'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import logoDark from "../../assets/logoDark.png";
import logoLight from "../../assets/logoLight.png";
import { ThemeToggle } from "../../components/ThemeToggle";
import { GoogleIcon } from "@/components/Icons";
import useThemeState from "@/zustand/theme";
import { changeInputs, submit } from "./services";
import { useUserState } from "@/zustand/userState";

export default function Login() {
    const router = useRouter()
    const theme = useThemeState((state: { theme: string }) => state.theme)
    const [inputValues, setInputValues] = useState<{ email: string, password: string }>({
        email: '',
        password: ''
    })
    const setUser = useUserState(state => state.setUser)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            submit({ theme, token, setUser, router })
        }
    }, [])
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
                <form
                    className={`
                        rounded-lg 
                        flex 
                        flex-col
                        items-center 
                        gap-6
                    `}
                    onSubmit={(e) => submit({ e, inputValues, theme, setUser, router })}
                >
                    <p className="font-bold text-xl">Inicio de sesión</p>
                    <div className="w-full flex flex-col">
                        <label className={`
                            font-bold
                            ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}
                        `}>
                            Email:
                        </label>
                        <input
                            className={`
                            ${theme === 'dark' ? 'font-bold bg-dark-input text-black' : 'bg-light-input text-white'} 
                            rounded-lg`
                            }
                            name="email"
                            onChange={(e) => changeInputs({ e, setInputValues })}
                        >
                        </input>
                    </div>
                    <div className="w-full flex flex-col">
                        <label className={`
                            font-bold
                            ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}
                        `}>
                            Contraseña:
                        </label>
                        <input
                            className={`
                            ${theme === 'dark' ? 'font-bold bg-dark-input text-black' : 'bg-light-input text-white'} 
                            rounded-lg`
                            }
                            name="password"
                            onChange={(e) => changeInputs({ e, setInputValues })}
                        >
                        </input>
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <button
                            className={`
                            buttonForm 
                            ${theme === 'dark' ?
                                    'buttonFormDark'
                                    :
                                    'buttonFormLight'
                                }
                        `}
                        >
                            Iniciar sesión
                        </button>
                        <button className="w-full mt-3">
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
            </div>
        </div>
    )
}