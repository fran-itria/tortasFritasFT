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
    user: User;
    setUser: (user: User) => void;
}

export const useUserState = create<UserState>()(
    persist(
        (set) => ({
            user: {
                active: false,
                admin: false,
                email: "",
                id: "",
                name: "",
                surname: "",
                phone: ""
            },
            setUser: (user: User) => set({ user }),
        }),
        {
            name: 'user-storage',
            partialize: (state) => ({
                user: state.user
            }),
        }
    )
)
