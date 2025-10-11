'use client'

import useThemeState from "@/zustand/theme"
import logoDark from "../assets/logoDark.png";
import logoLight from "../assets/logoLight.png";
import { ThemeToggle } from "./ThemeToggle";
import { GoogleIcon, InstagramIcon, PersonIcon, ShoppingCartIcon } from "./Icons";
import Link from "next/link";
import { continueWithGoogle } from "@/app/services/continueWithGoogle";
import { useUserState } from "@/zustand/userState";
import { useEffect } from "react";

export default function Header() {
    const theme = useThemeState((state: { theme: string }) => state.theme)
    const { user, setUser } = useUserState(state => state)
    useEffect(() => console.log(user), [user])
    return (
        <div className="flex justify-between shadow-md shadow-black dark:shadow-gray-600">
            <div className="flex items-center max-xs:w-full">
                <img
                    src={theme === 'dark' ? logoDark.src : logoLight.src}
                    alt="Logo"
                    className='rounded-full w-23 h-auto p-2 max-xs:w-16'
                />
                <p className="font-bold text-2xl max-xs:text-lg">Tortas Fritas FT</p>
            </div>
            <div className="flex items-center w-90 justify-around max-xs:w-full max-xs:justify-between">
                <Link className={`${!user ? 'max-xs:w-full' : 'w-full'} flex justify-center`} href={'https://www.instagram.com/tortasfritas.ft/'} target="_blank">
                    <InstagramIcon theme={theme} />
                </Link>
                {!user ?
                    <button
                        onClick={async () => await continueWithGoogle({ theme, setUser })}
                    >
                        <div className={`
                        flex 
                        items-center 
                        justify-center
                        rounded-full
                        pt-[3px]
                        pb-[3px]
                        max-xs:pt-[8px]
                        max-xs:pb-[8px]
                        px-2
                        font-bold
                        ${theme == 'dark' ? 'bg-dark-input text-[#333333]' : 'bg-light-input text-light-primary'}
                        `}>
                            <GoogleIcon theme={theme} />
                            <p className="ml-2 max-xs:hidden">Continuar con Google</p>
                        </div>
                    </button>
                    :
                    <div className="flex w-full justify-between">
                        <ShoppingCartIcon theme={theme} />
                        <PersonIcon theme={theme} />
                    </div>
                }
                <ThemeToggle />
            </div>
        </div>
    )
}