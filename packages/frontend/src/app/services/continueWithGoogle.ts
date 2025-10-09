import { signInWithGoogle } from "@/firebase/firebase";
import { User } from "@/zustand/userState";
import axios from "axios";

interface LoginWithGoogle {
    theme: string
    setUser: (user: User) => void
}
export const baseUrl = 'http://localhost:3000'

export const continueWithGoogle = async ({ setUser }: LoginWithGoogle) => {
    const result = await signInWithGoogle()
    const name = result.user.displayName?.split(' ')[0]
    const surname = result.user.displayName?.split(' ')[1] || ''
    try {
        const user = await axios.put(`${baseUrl}/users/login`, { email: result.user.email })
        if (user) {
            setUser(user.data.user)
            localStorage.setItem('token', user.data.token)
        }
    } catch (error: any) {
        const createUser = await axios.post(`${baseUrl}/users`, {
            id: result.user.uid,
            email: result.user.email,
            name,
            surname,
            active: true
        })
        if (createUser) {
            localStorage.setItem('token', createUser.data.token)
            setUser(createUser.data)
        }
    }
}