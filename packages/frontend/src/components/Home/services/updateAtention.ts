import { OptionsResponse } from "@/services/types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export enum TimePeriod {
    MorningStart = "morningStart",
    MorningEnd = "morningEnd",
    AfternoonStart = "afternoonStart",
    AfternoonEnd = "afternoonEnd"
}

interface Props {
    setAtention: Dispatch<SetStateAction<OptionsResponse | undefined>>
    id: string
    e: ChangeEvent<HTMLInputElement>
}

interface ChangeInputsProps {
    e: ChangeEvent<HTMLInputElement>
    setAtention: Dispatch<SetStateAction<OptionsResponse | undefined>>
}


export const changeHours = ({ setAtention, id, e }: Props) => {
    const isMorning = (e.target.name == TimePeriod.MorningStart || e.target.name == TimePeriod.MorningEnd);
    const isStart = (e.target.name == TimePeriod.MorningStart || e.target.name == TimePeriod.AfternoonStart);
    const period = isMorning ? "morning" : "afternoon";
    const position = isStart ? 0 : 1;
    const value = e.target.value;
    setAtention((prev) => {
        if (prev) {
            const days = prev.open
            const findHour = days.findIndex(day => day.id == id)
            if (days[findHour][period] == undefined) {
                days[findHour][period] = ["", ""];
            }
            days[findHour][period][position] = value
            return {
                ...prev,
                open: days
            }
        }
    })
}

export const changeInputsAtention = ({ e, setAtention }: ChangeInputsProps) => {
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setAtention((prev) => {
        if (prev) {
            return {
                ...prev,
                [name]: value
            }
        }
    })
}
