'use client'

import Atention from "@/components/Home/Atention";
import { usersServiceApi } from "@/services/api";
import { useUserState } from "@/zustand/userState";
import { useEffect } from "react";

export default function Home() {
  const { setUser } = useUserState((state) => state);
  useEffect(() => {
    const token = localStorage.getItem('token');
    (async () => {
      try {
        if (token) {
          const user = await usersServiceApi.loginWithToken()
          setUser(user.data)
        }
        else {
          setUser(undefined)
        }
      } catch (error) {
        console.log({ error })
      }
    })()
  }, [])
  return (
    <>
      <Atention />
    </>
  );
}
