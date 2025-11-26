'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from './Icons'
import useThemeState from '@/zustand/theme'
import { useUserState } from '@/zustand/userState'
import { Theme } from '@/utils/constTheme'

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
    }, [theme, updateState])

    if (!mounted) {
        return null
    }

    return (
        <button
            aria-label="toggle theme"
            onClick={() => setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)}
            className='w-full flex justify-center'
        >
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