import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
    active: boolean;
    admin: boolean;
    email: string;
    id: string;
    name: string;
    surname: string;
    phone: string;
}

interface UserState {
    user: User | undefined;
    setUser: (user: User | undefined) => void;
}

export const useUserState = create<UserState>()(
    persist(
        (set) => ({
            user: undefined,
            setUser: (user: User | undefined) => set({ user }),
        }),
        {
            name: 'user-storage',
            partialize: (state) => ({
                user: state.user
            }),
        }
    )
)
