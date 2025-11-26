'use client'

import useThemeState from "@/zustand/theme"
import logoDark from "../assets/logoDark.png";
import logoLight from "../assets/logoLight.png";
import { ThemeToggle } from "./ThemeToggle";
import { GoogleIcon, InstagramIcon, ShoppingCartIcon, WhatsappIcon } from "./Icons";
import Link from "next/link";
import { continueWithGoogle } from "@/app/services/continueWithGoogle";
import { useUserState } from "@/zustand/userState";
import ButtonPerson from "./Header/ButtonPerson";
import { Theme } from "@/utils/constTheme";
import Image from "next/image";

export default function Header() {
    const theme = useThemeState((state: { theme: string }) => state.theme)
    const { user, setUser } = useUserState(state => state)
    const phone = '3435023925'
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
                <Link className='w-full flex justify-center' href={`https://wa.me/${phone}`} target="_blank" aria-label="whatsapp">
                    <WhatsappIcon theme={theme} />
                </Link>
                <Link className='w-full flex justify-center' href={'https://www.instagram.com/tortasfritas.ft/'} target="_blank" aria-label="Instagram">
                    <InstagramIcon theme={theme} />
                </Link>
                {!user ?
                    <button
                        aria-label="google icon"
                        onClick={async () => await continueWithGoogle({ theme, setUser })}
                        className={`
                            w-full
                            flex 
                            items-center 
                            justify-center
                        `}
                    >
                        <div className={`
                                p-2
                                rounded-full
                                max-xs:pt-[8px]
                                max-xs:pb-[8px]
                                font-bold
                                ${theme == Theme.DARK ? 'bg-dark-input text-[#333333]' : 'bg-light-input text-light-primary'}
                            `}>
                            <GoogleIcon theme={theme} />
                        </div>
                    </button>
                    :
                    <ButtonPerson />
                    // <div className="flex w-full justify-around items-center">
                    // {/* <button aria-label="Cart shop" className='w-full'>
                    //     <ShoppingCartIcon theme={theme} />
                    // </button> */}
                    // </div>
                }
                <ThemeToggle />
            </div>
        </div>
    )
}