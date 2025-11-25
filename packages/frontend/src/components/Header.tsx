'use client'

import useThemeState from "@/zustand/theme"
import logoDark from "../assets/logoDark.png";
import logoLight from "../assets/logoLight.png";
import { ThemeToggle } from "./ThemeToggle";
import { GoogleIcon, InstagramIcon, ShoppingCartIcon } from "./Icons";
import Link from "next/link";
import { continueWithGoogle } from "@/app/services/continueWithGoogle";
import { useUserState } from "@/zustand/userState";
import ButtonPerson from "./Header/ButtonPerson";
import { Theme } from "@/utils/constTheme";
import Image from "next/image";

export default function Header() {
    const theme = useThemeState((state: { theme: string }) => state.theme)
    const { user, setUser } = useUserState(state => state)
    return (
        <div className={`${theme == Theme.DARK ? 'bg-dark-primary shadow-gray-600' : 'bg-light-primary shadow-black'} w-full flex justify-between shadow-md`}>
            <div className="flex items-center max-xs:w-full">
                <Image
                    priority
                    height={92}
                    width={23}
                    src={theme === Theme.DARK ? logoDark.src : logoLight.src}
                    alt="Logo"
                    className='rounded-full w-23 h-auto p-2 max-xs:w-16'
                />
                <p className="font-bold text-2xl max-xs:text-lg">Tortas Fritas FT</p>
            </div>
            <div className="flex items-center w-90 justify-around max-xs:w-full max-xs:justify-between">
                <Link className={`${!user ? 'max-xs:w-full' : 'w-full'} flex justify-center`} href={'https://www.instagram.com/tortasfritas.ft/'} target="_blank" aria-label="Instagram">
                    <InstagramIcon theme={theme} />
                </Link>
                {!user ?
                    <button
                        aria-label="google icon"
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
                        ${theme == Theme.DARK ? 'bg-dark-input text-[#333333]' : 'bg-light-input text-light-primary'}
                        `}>
                            <GoogleIcon theme={theme} />
                            <p className="ml-2 max-xs:hidden">Continuar con Google</p>
                        </div>
                    </button>
                    :
                    <div className="flex w-full justify-between">
                        <button aria-label="Cart shop">
                            <ShoppingCartIcon theme={theme} />
                        </button>
                        <ButtonPerson />
                    </div>
                }
                <ThemeToggle />
            </div>
        </div>
    )
}