'use client'

import { optionsServiceApi } from "@/services/api";
import { OptionsResponse } from "@/services/types";
import { useEffect, useState } from "react";

export default function Atention() {
    const [open, setOpen] = useState<OptionsResponse | undefined>(undefined);
    useEffect(() => {
        (async () => {
            const options = await optionsServiceApi.getAll()
            console.log(options)
            setOpen(options.data)
        })()
    }, []);

    return (
        <div className="mt-5 ml-5">
            <p className="font-bold text-xl">Dirección: {open?.address}</p>
            <div>
                <p className="font-bold text-xl">Horario de atención: </p>
                <ul className="list-disc list-inside">
                    {open?.open.map((hour, index) => (
                        <li
                            key={index}
                            className="font-bold"
                        >
                            {hour}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}