'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from './Icons'
import useThemeState from '@/zustand/theme'

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
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
            fixed 
            top-4 
            right-4 
            p-2 
            rounded-md
            ${theme == 'dark' ? 'bg-dark-background-button' : 'bg-light-background-button'}
        `}>
            {theme === 'light' ? (
                <MoonIcon />
            ) : (
                <SunIcon />
            )}
        </button>
    )
}