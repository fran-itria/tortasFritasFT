import { alerts } from "@/alerts/alerts";
import { usersServiceApi } from "@/services/api";
import { constLoader } from "@/utils/constLoader";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
    id: string;
    e: ChangeEvent<HTMLInputElement>
    setLoader: Dispatch<SetStateAction<string>>
    theme: string
}

export default async function changeAdminStatus({ id, e, setLoader, theme }: Props) {
    setLoader(constLoader.changeAdminStatus)
    try {
        const response = await usersServiceApi.changeAdminStatus({ id, admin: e.target.checked })
        alerts("success", theme, response?.data?.message)
    } catch (error) {
        if (error instanceof Object && 'response' in error) {
            const apiError = error as { response: { data: { message: string } } }
            alerts("error", theme, apiError.response.data.message)
        }
    } finally {
        setLoader('')
    }
}