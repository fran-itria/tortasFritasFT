import { usersServiceApi } from "@/services/api";
import { constLoader } from "@/utils/constLoader";
import useThemeState from "@/zustand/theme";
import { useUserState } from "@/zustand/userState";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface User {

    id: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    admin: boolean,
    active: boolean
    orders: {
        id: string,
        userId: string
        amount: number,
        cash?: null,
        paymentMethod: string,
        state: string,
    }[]
}
export default function useUsersHook() {
    const [allUsers, setAllUsers] = useState<User[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [loader, setLoader] = useState<string>('');
    const [searchUser, setSearchUser] = useState<string>('');
    const { user } = useUserState(state => state);
    const { theme } = useThemeState(state => state)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !user || !user.admin) {
            router.push('/')
        }
    }, [router, user])

    useEffect(() => {
        (async () => {
            setLoader(constLoader.getUsers)
            const response = await usersServiceApi.getAll()
            setUsers(response.data)
            setAllUsers(response.data)
            setLoader('')
        })()
    }, [])

    useEffect(() => {
        console.log(searchUser)
        setUsers(_prevUsers => {
            const copy = [...allUsers]
            if (!searchUser) return allUsers
            else return copy.filter(user =>
                user.name.toLowerCase().includes(searchUser.toLowerCase())
                ||
                user.surname.toLowerCase().includes(searchUser.toLowerCase())
            )
        })
    }, [searchUser])

    return { users, setUsers, loader, setLoader, setSearchUser, theme }
}