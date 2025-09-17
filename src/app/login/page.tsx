'use client'

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import logoDark from "../../assets/logoDark.png";
import logoLight from "../../assets/logoLight.png";
import { ThemeToggle } from "../../components/ThemeToggle";

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
            <h1 className="text-2xl font-bold mb-4">Login Page</h1>
            <p className="text-gray-600 dark:text-gray-300">Current theme: {theme}</p>
        </div>
    )
}