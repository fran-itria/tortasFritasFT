import { alerts } from "@/alerts/alerts";
import { optionsServiceApi } from "@/services/api";
import { OptionsResponse } from "@/services/types";
import { constLoader } from "@/utils/constLoader";
import { Dispatch, FormEvent, SetStateAction } from "react";


export default async function submitAtention(
    atentionData: OptionsResponse | undefined,
    setLoader: Dispatch<SetStateAction<string>>,
    e: FormEvent<HTMLFormElement>,
    theme: string,
    setOpen: Dispatch<SetStateAction<boolean>>
) {
    e.preventDefault()
    try {
        setLoader(constLoader.editAtention)
        await optionsServiceApi.update(atentionData)
    } catch (error: any) {
        alerts("error", theme, error.response?.data?.message || "Error al guardar cambios")
    } finally {
        setLoader('')
        setOpen(false)
    }
}