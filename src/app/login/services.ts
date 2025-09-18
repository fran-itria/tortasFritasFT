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
    e: FormEvent<HTMLFormElement>,
    inputValues: {
        email: string,
        password: string
    }
    theme: string
}

export const changeInputs = ({ e, setInputValues }: InputValues) => {
    const name = e.target.name
    const value = e.target.value
    setInputValues((prev) => { return { ...prev, [name]: value } })
}

export const submit = async ({ e, inputValues, theme }: Submit) => {
    e.preventDefault();
    const { email, password } = inputValues;
    try {
        const token = localStorage.getItem('token')
        const user = await axios.put('/api/user/login',
            { email, password },
            { headers: { Authorization: token } }
        )
        localStorage.setItem('token', user.data.token)
    } catch (error: any) {
        if (error.response) alerts('error', theme, error.response.data.error)
    }
}