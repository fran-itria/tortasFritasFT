import { signInWithGoogle } from "@/firebase/firebase";
import { User } from "@/zustand/userState";
import axios from "axios";

interface LoginWithGoogle {
    theme: string
    setUser: (user: User) => void
    router?: any
}

export const continueWithGoogle = async ({ setUser, router }: LoginWithGoogle) => {
    const result = await signInWithGoogle()
    const name = result.user.displayName?.split(' ')[0]
    const surname = result.user.displayName?.split(' ')[1] || ''
    try {
        const user = await axios.put('/api/user/login', { id: result.user.uid })
        if (user) {
            setUser(user.data.user)
            localStorage.setItem('token', user.data.token)
            router.push('/')
        }
    } catch (error: any) {
        const createUser = await axios.post('api/user/register', {
            id: result.user.uid,
            email: result.user.email,
            name,
            surname,
            active: true
        })
        if (createUser) {
            localStorage.setItem('token', createUser.data.token)
            setUser(createUser.data)
            router.push('/')
        }
    }
}