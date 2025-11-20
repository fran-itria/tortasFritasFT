import { usersServiceApi } from "@/services/api";
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

    useEffect(() => {
        (async () => {
            const response = await usersServiceApi.getAll()
            console.log(response.data);
            setUsers(response.data)
        })()
    }, [])

    return { users, setUsers }
}