import { alerts } from "@/alerts/alerts";
import { ApiErrorResponse } from "@/lib/axios";
import { usersServiceApi } from "@/services/api";
import { constLoader } from "@/utils/constLoader";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
    id: string;
    e: ChangeEvent<HTMLInputElement>
    setLoader: Dispatch<SetStateAction<string>>
    theme: string
}

export default async function changeActiveStatus({ id, e, setLoader, theme }: Props) {
    const value = e.target.checked;
    setLoader(value ? constLoader.activeUser : constLoader.deleteUser)
    try {
        const response = await usersServiceApi.changeActiveStatus({ id, active: e.target.checked })
        alerts("success", theme, response?.data?.message)
    } catch (error) {
        if (error instanceof Object && 'response' in error) {
            const apiError = error as { response: ApiErrorResponse }
            alerts("error", theme, apiError.response.data.message)
        }
    } finally {
        setLoader('')
    }
}