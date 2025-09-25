import { LoadingIcon } from "./Icons";
import useThemeState from "@/zustand/theme";

export default function Loading({ text }: { text: string }) {
    const theme = useThemeState((state: { theme: string }) => state.theme)
    return (
        <div className="absolute h-screen w-screen flex justify-center items-center">
            <div className="flex-col justify-center items-center">
                <p className={`${theme == 'dark' ? 'text-black' : 'text-white'} font-bold text-xl mb-4`}>{text}</p>
                <LoadingIcon theme={theme} />
            </div>
        </div>
    )
}