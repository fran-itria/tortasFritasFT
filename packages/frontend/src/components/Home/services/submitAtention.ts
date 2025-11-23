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
    } catch (error) {
        if (error instanceof Object && 'response' in error) {
            const apiError = error as { response: { data: { message: string } } }
            alerts("error", theme, apiError.response.data.message)
        }
    } finally {
        setLoader('')
        setOpen(false)
    }
}