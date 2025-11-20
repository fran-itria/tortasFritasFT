import { usersServiceApi } from "@/services/api";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
    id: string;
    e: ChangeEvent<HTMLInputElement>
    setLoader: Dispatch<SetStateAction<boolean>>
}

export default async function changeAdminStatus({ id, e, setLoader }: Props) {
    setLoader(true)
    try {
        const response = await usersServiceApi.changeAdminStatus({ id, admin: e.target.checked })
        console.log(response);
    } catch (error) {
        console.error(error);
    } finally {
        setLoader(false)
    }
}