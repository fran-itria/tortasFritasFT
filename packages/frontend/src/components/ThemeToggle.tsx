'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from './Icons'
import useThemeState from '@/zustand/theme'
import { useUserState } from '@/zustand/userState'

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
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={`
            rounded-full
            ${!user ? 'max-xs:w-full' : 'w-full'}
            flex
            justify-center
        `}>
            <div className={`
                ${theme == 'dark' ? 'bg-dark-background-button' : 'bg-light-background-button'}
                p-2
                rounded-full
            `}>
                {theme === 'light' ? (
                    <MoonIcon />
                ) : (
                    <SunIcon />
                )}
            </div>
        </button>
    )
}