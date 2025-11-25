"use client"
import { useUserState } from "@/zustand/userState"
import Atention from "../Home/Atention"
import AdminHeader from "../Home/AdminHeader"


export default function HeaderComponent() {
    const { user } = useUserState(state => state)
    return !user || !user?.admin ?
        <Atention />
        :
        <AdminHeader />
}