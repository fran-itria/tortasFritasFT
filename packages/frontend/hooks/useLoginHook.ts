import { ApiError } from "@/lib/axios";
import { usersServiceApi } from "@/services/api";
import { useUserState } from "@/zustand/userState";
import { useEffect } from "react";


export default function useLoginHook() {
    const { setUser } = useUserState(state => state)
    useEffect(() => {
        const token = localStorage.getItem('token');
        (async () => {
            try {
                if (token) {
                    const response = await usersServiceApi.loginWithToken()
                    setUser(response.data.user)
                }
                else {
                    setUser(undefined)
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    if (error.response.data.statusCode == 401) {
                        setUser(undefined)
                    }
                }
            }
        })()
    }, [])
}