import {
    FaSun,
    FaMoon,
    FaGoogle,
    FaInstagram,
    FaShoppingCart,
    FaCartPlus,
    FaPencilAlt,
    FaTrash
} from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoPerson, IoAddCircle } from "react-icons/io5";
import { Theme } from '@/utils/constTheme';

export function SunIcon() {
    return <FaSun />
}

export function MoonIcon() {
    return <FaMoon color='white' />
}

export function GoogleIcon({ theme }: { theme: string | undefined }) {
    return <FaGoogle color={`${theme == Theme.DARK ? '#333333' : '#E2E2E2'}`} />
}

export function LoadingIcon({ theme }: { theme: string | undefined }) {
    return <AiOutlineLoading3Quarters size='50' className='animate-spin w-full' color={`${theme == Theme.DARK ? '#000000ff' : '#E2E2E2'}`} />
}

export function InstagramIcon({ theme }: { theme: string | undefined }) {
    return <div className='w-8 max-xs:w-6 h-auto'>
        <FaInstagram size='auto' color={`${theme == Theme.DARK ? '#E2E2E2' : '#333333'}`} />
    </div>
}

export function ShoppingCartIcon({ theme }: { theme: string | undefined }) {
    return <div className='w-8 max-xs:w-6 h-auto'>
        <FaShoppingCart size='auto' color={`${theme == Theme.DARK ? '#E2E2E2' : '#333333'}`} />
    </div>
}

export function PersonIcon({ theme }: { theme: string | undefined }) {
    return <div className='w-8 max-xs:w-6 h-auto'>
        <IoPerson size='auto' color={`${theme == Theme.DARK ? '#E2E2E2' : '#333333'}`} />
    </div>
}

export function CartIconPlus() {
    return <div className='w-6 max-xs:w-5 h-auto'>
        <FaCartPlus size='auto' color='black' />
    </div>
}

export function PencilIcon() {
    return <div className='w-6 max-xs:w-5 h-auto'>
        <FaPencilAlt size='auto' color='black' />
    </div>
}

export function TrashIcon() {
    return <div className='w-6 max-xs:w-4 h-auto'>
        <FaTrash size='auto' color='red' />
    </div>
}

export function AddCircleIcon() {
    return <div>
        <IoAddCircle size='50' color='#00A900' />
    </div>
}
