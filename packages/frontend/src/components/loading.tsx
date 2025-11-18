import { LoadingIcon } from "./Icons";
import useThemeState from "@/zustand/theme";

export default function Loading({ text }: { text: string }) {
    const theme = useThemeState((state: { theme: string }) => state.theme)
    return (
        <div className="z-10 absolute top-0 left-0 h-full w-full flex justify-center items-center">
            <div className={`${theme == 'dark' ? 'bg-dark-background-button' : 'bg-light-background-button'} flex-col justify-center items-center p-2 rounded-lg border-2`}>
                <p className={`${theme == 'dark' ? 'text-black' : 'text-white'} font-bold text-xl mb-4`}>{text}</p>
                <LoadingIcon theme={theme} />
            </div>
        </div>
    )
}