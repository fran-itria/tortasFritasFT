'use client'

import { Theme } from '@/utils/constTheme'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme={Theme.LIGHT}>
            {children}
        </ThemeProvider>
    )
}