import { usersServiceApi } from "@/services/api";
import { constLoader } from "@/utils/constLoader";
import { useEffect, useState } from "react";



export default function useUsersHook() {
    const [users, setUsers] = useState<{
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
    }[]>([])

    const [loader, setLoader] = useState<string>('');

    useEffect(() => {
        (async () => {
            setLoader(constLoader.getUsers)
            const response = await usersServiceApi.getAll()
            setUsers(response.data)
            setLoader('')
        })()
    }, [])

    return { users, setUsers, loader, setLoader }
}