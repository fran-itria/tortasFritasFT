import {
    FaSun,
    FaMoon,
    FaGoogle,
    FaInstagram,
    FaShoppingCart,
    FaCartPlus,
    FaPencilAlt,
    FaTrash,
    FaWhatsapp,
    FaSearch
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

export function WhatsappIcon({ theme }: { theme: string | undefined }) {
    return <FaWhatsapp size={28} color={`${theme == Theme.DARK ? '#E2E2E2' : '#333333'}`} />
}

export function InstagramIcon({ theme }: { theme: string | undefined }) {
    return <FaInstagram size={28} color={`${theme == Theme.DARK ? '#E2E2E2' : '#333333'}`} />
}

export function ShoppingCartIcon({ theme }: { theme: string | undefined }) {
    return <FaShoppingCart size={28} color={`${theme == Theme.DARK ? '#E2E2E2' : '#333333'}`} />
}

export function PersonIcon({ theme }: { theme: string | undefined }) {
    return <IoPerson size={28} color={`${theme == Theme.DARK ? '#E2E2E2' : '#333333'}`} />
}

export function CartIconPlus() {
    return <FaCartPlus size={28} color='black' />
}

export function PencilIcon() {
    return <FaPencilAlt size={25} color='black' />
}

export function TrashIcon() {
    return <FaTrash size={20} color='red' />
}

export function AddCircleIcon() {
    return <IoAddCircle size={50} color='#00A900' />
}

export function SearchIcon({ theme }: { theme: string | undefined }) {
    return <FaSearch size={15} color={`${theme == Theme.DARK ? '#000247' : '#E2E2E2'}`} />
}
