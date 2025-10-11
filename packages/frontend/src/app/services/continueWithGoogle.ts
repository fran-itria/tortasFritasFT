import { signInWithGoogle } from "@/firebase/firebase";
import { usersServiceApi } from "@/services/api";
import { User } from "@/zustand/userState";

interface LoginWithGoogle {
    theme: string
    setUser: (user: User) => void
}

export const continueWithGoogle = async ({ setUser }: LoginWithGoogle) => {
    const result = await signInWithGoogle()
    const name = result.user.displayName?.split(' ')[0]
    const surname = result.user.displayName?.split(' ')[1] || ''
    try {
        const user = await usersServiceApi.login(result.user.email as string)
        if (user) {
            setUser(user.data.user)
            localStorage.setItem('token', user.data.token)
        }
    } catch (error: any) {
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