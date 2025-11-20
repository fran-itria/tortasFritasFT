'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from './Icons'
import useThemeState from '@/zustand/theme'
import { useUserState } from '@/zustand/userState'
import { Theme } from '@/utils/enums'

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const { user } = useUserState(state => state)
    const updateState = useThemeState((state) => state.updateTheme)
    useEffect(() => {
        setMounted(true)
    }, [])
    useEffect(() => {
        updateState(theme as string)
    }, [theme])

    if (!mounted) {
        return null
    }

    return (
        <button
            onClick={() => setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)}
            className={`
            rounded-full
            ${!user ? 'max-xs:w-full' : 'w-full'}
            flex
            justify-center
        `}>
            <div className={`
                ${theme == Theme.DARK ? 'bg-dark-background-button' : 'bg-light-background-button'}
                p-2
                rounded-full
            `}>
                {theme === Theme.LIGHT ? (
                    <MoonIcon />
                ) : (
                    <SunIcon />
                )}
            </div>
        </button>
    )
}