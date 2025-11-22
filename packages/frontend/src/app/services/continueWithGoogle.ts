import { alerts } from "@/alerts/alerts";
import { signInWithGoogle } from "@/firebase/firebase";
import { ApiError } from "@/lib/axios";
import { usersServiceApi } from "@/services/api";
import { Errors } from "@/utils/constErrors";
import { User } from "@/zustand/userState";

interface LoginWithGoogle {
    theme: string
    setUser: (user: User) => void
}

export const continueWithGoogle = async ({ theme, setUser }: LoginWithGoogle) => {
    const result = await signInWithGoogle()
    const name = result.user.displayName?.split(' ')[0]
    const surname = result.user.displayName?.split(' ')[1] || ''
    try {
        const user = await usersServiceApi.login(result.user.email as string)
        if (!user.data.user.active) throw new ApiError(Errors.USER_INACTIVE, { data: { statusCode: 403 } } as any)
        if (user) {
            setUser(user.data.user)
            localStorage.setItem('token', user.data.token)
        }
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.response.data.statusCode == 403) {
                alerts('error', theme, error.message)
            }
        } else {
            const createUser = await usersServiceApi.createUser({
                id: result.user.uid,
                email: result.user.email as string,
                name: name as string,
                surname
            })
            if (createUser) {
                localStorage.setItem('token', createUser.data.token)
                setUser(createUser.data)
            }
        }
    }
}