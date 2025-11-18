import { optionsServiceApi } from "@/services/api"
import { OptionsResponse } from "@/services/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { changeHours, changeInputsAtention, TimePeriod } from "./services/updateAtention"
import useThemeState from "@/zustand/theme"
import Loading from "../loading"
import { constLoader } from "@/utils/constLoader"
import submitAtention from "./services/submitAtention"

export const EditHours = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const [atention, setAtention] = useState<OptionsResponse | undefined>(undefined)
    const { theme } = useThemeState(state => state)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            const response = await optionsServiceApi.getAll()
            setAtention(response.data)
        })()
    }, [])

    useEffect(() => console.log(atention), [atention])
    return (
        <div className={`${theme == "dark" ? "from-dark-secondary to-dark-background-button" : "from-light-secondary to-light-tertiary"} z-10 p-5 border-2 border-white absolute top-50 bg-linear-to-b w-90`}>
            {loading && <Loading text={constLoader.editAtention} />}
            <form onSubmit={(e) => submitAtention(atention, setLoading, e, theme, setOpen)} className={`${loading && "blur-xs"}`}>
                <div>
                    <label className="font-bold">
                        Direccion:
                    </label>
                    <input defaultValue={atention?.address} name="address" onChange={(e) => changeInputsAtention({ e, setAtention })} className="px-2 ml-2 bg-dark-input rounded-lg text-black"></input>
                </div >
                {
                    atention?.open?.map((day) => (
                        <div className="flex w-full flex flex-col mb-2" key={day.id}>
                            <label>{day.day}:</label>
                            <div className={`h-15 flex flex-col justify-around ${theme == "dark" ? "text-black" : "text-white"} rounded-lg p-2`}>
                                <div className="w-50 flex flex-row justify-between">
                                    <input onChange={e => changeHours({ e, id: day.id, setAtention })} name={TimePeriod.MorningStart} defaultValue={day.morning && day.morning[0]} type="time" className={`${theme == "dark" ? "bg-dark-input" : "bg-light-input"} rounded-lg px-2 h-5`}></input>
                                    <input onChange={e => changeHours({ e, id: day.id, setAtention })} name={TimePeriod.MorningEnd} defaultValue={day.morning && day.morning[1]} type="time" className={`${theme == "dark" ? "bg-dark-input" : "bg-light-input"} rounded-lg px-2 h-5`}></input>
                                </div>
                                <div className="w-50 flex flex-row justify-between items-center">
                                    <input onChange={e => changeHours({ e, id: day.id, setAtention })} name={TimePeriod.AfternoonStart} defaultValue={day.afternoon && day.afternoon[0]} type="time" className={`${theme == "dark" ? "bg-dark-input" : "bg-light-input"} rounded-lg px-2 h-5`}></input>
                                    <input onChange={e => changeHours({ e, id: day.id, setAtention })} name={TimePeriod.AfternoonEnd} defaultValue={day.afternoon && day.afternoon[1]} type="time" className={`${theme == "dark" ? "bg-dark-input" : "bg-light-input"} rounded-lg px-2 h-5`}></input>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div>
                    <label className="font-bold">Recibir pedidos: </label>
                    <input type="checkbox" name="ordersActive" onChange={(e) => changeInputsAtention({ e, setAtention })} defaultChecked={atention?.ordersActive}></input>
                </div>
                <button className={`${theme == "dark" ? "bg-dark-secondary text-dark-text" : "bg-light-background-button text-white"} rounded-lg px-2 mt-5`}>
                    Guardar
                </button>
            </form >
        </div >
    )
}