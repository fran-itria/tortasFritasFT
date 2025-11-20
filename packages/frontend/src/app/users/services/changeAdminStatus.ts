import { alerts } from "@/alerts/alerts";
import { usersServiceApi } from "@/services/api";
import { constLoader } from "@/utils/constLoader";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
    id: string;
    e: ChangeEvent<HTMLInputElement>
    setLoader: Dispatch<SetStateAction<{
        state: boolean;
        text: string;
    }>>
    theme: string
}

export default async function changeAdminStatus({ id, e, setLoader, theme }: Props) {
    setLoader({ state: true, text: constLoader.changeAdminStatus })
    try {
        const response = await usersServiceApi.changeAdminStatus({ id, admin: e.target.checked })
        alerts("success", theme, response?.data?.message)
    } catch (error: any) {
        console.error(error);
        alerts("error", theme, error?.response?.data?.message)
    } finally {
        setLoader({ state: false, text: '' })
    }
}