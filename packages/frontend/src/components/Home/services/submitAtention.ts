import { alerts } from "@/alerts/alerts";
import { optionsServiceApi } from "@/services/api";
import { OptionsResponse } from "@/services/types";
import { Dispatch, FormEvent, SetStateAction } from "react";


export default async function submitAtention(
    atentionData: OptionsResponse | undefined,
    setLoading: Dispatch<SetStateAction<boolean>>,
    e: FormEvent<HTMLFormElement>,
    theme: string,
    setOpen: Dispatch<SetStateAction<boolean>>
) {
    e.preventDefault()
    try {
        setLoading(true)
        await optionsServiceApi.update(atentionData)
    } catch (error: any) {
        alerts("error", theme, error.response?.data?.message || "Error al guardar cambios")
    } finally {
        setLoading(false)
        setOpen(false)
    }
}