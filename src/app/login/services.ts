import { alerts } from "@/alerts/alerts";
import axios from "axios";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

interface InputValues {
    e: ChangeEvent<HTMLInputElement>,
    setInputValues: Dispatch<SetStateAction<{
        email: string;
        password: string;
    }>>
}

interface Submit {
    e?: FormEvent<HTMLFormElement>,
    inputValues?: {
        email: string,
        password: string
    }
    theme: string
    token?: string
}

export const changeInputs = ({ e, setInputValues }: InputValues) => {
    const name = e.target.name
    const value = e.target.value
    setInputValues((prev) => { return { ...prev, [name]: value } })
}

export const submit = async ({ e, inputValues, theme, token }: Submit) => {
    try {
        let user
        if (!token && inputValues && e) {
            e.preventDefault();
            const { email, password } = inputValues;
            user = await axios.put('/api/user/login', { email, password })
            localStorage.setItem('token', user.data.token)
        } else if (token) {
            user = await axios.put('/api/user/login', {}, {
                headers: {
                    Authorization: token
                }
            })
        }
        console.log(user)
    } catch (error: any) {
        if (error.response) alerts('error', theme, error.response.data.error)
    }
}