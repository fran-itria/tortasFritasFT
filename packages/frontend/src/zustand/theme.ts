import { create } from "zustand";

interface ThemeState {
    theme: string;
    updateTheme: (newTheme: string) => void;
}

const useThemeState = create<ThemeState>((set) => ({
    theme: 'light',
    updateTheme: (newTheme: string) => set({ theme: newTheme })
}))

export default useThemeState;