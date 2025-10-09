import { FaSun, FaMoon, FaGoogle, FaInstagram, FaShoppingCart } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";

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

export function InstagramIcon({ theme }: { theme: string | undefined }) {
    return <div className='w-8 max-xs:w-6 h-auto'>
        <FaInstagram size='auto' color={`${theme == 'dark' ? '#E2E2E2' : '#333333'}`} />
    </div>
}

export default function ShoppingCartIcon({ theme }: { theme: string | undefined }) {
    return <div className='w-8 max-xs:w-6 h-auto'>
        <FaShoppingCart size='auto' color={`${theme == 'dark' ? '#E2E2E2' : '#333333'}`} />
    </div>
}

export function PersonIcon({ theme }: { theme: string | undefined }) {
    return <div className='w-8 max-xs:w-6 h-auto'>
        <IoPerson size='auto' color={`${theme == 'dark' ? '#E2E2E2' : '#333333'}`} />
    </div>
}
