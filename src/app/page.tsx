'use client'

import { useUserState } from "@/zustand/userState";
import { useEffect } from "react";

export default function Home() {
  const user = useUserState((state) => state.user);
  useEffect(() => console.log(user), [user]);
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold text-center">Bienvenido a Tortas Fritas FT</h1>
      <p>{user.name}</p>
    </div>
  );
}
