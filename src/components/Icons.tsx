import { FaSun, FaMoon, FaGoogle } from 'react-icons/fa';
export function SunIcon() {
    return <FaSun />
}

export function MoonIcon() {
    return <FaMoon color='white' />
}

export function GoogleIcon({ theme }: { theme: string | undefined }) {
    return <FaGoogle color={`${theme == 'dark' ? '#333333' : '#E2E2E2'}`} />
}
