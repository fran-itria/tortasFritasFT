import { FaSun, FaMoon, FaGoogle } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function SunIcon() {
    return <FaSun />
}

export function MoonIcon() {
    return <FaMoon color='white' />
}

export function GoogleIcon({ theme }: { theme: string | undefined }) {
    return <FaGoogle color={`${theme == 'dark' ? '#333333' : '#E2E2E2'}`} />
}

export function LoadingIcon({ theme }: { theme: string | undefined }) {
    return <AiOutlineLoading3Quarters size='50' className='animate-spin w-full' color={`${theme == 'dark' ? '#000000ff' : '#E2E2E2'}`} />
}
