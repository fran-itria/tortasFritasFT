'use client'

import Atention from "@/components/Home/Atention";
import useLoginHook from "hooks/useLoginHook";

export default function Home() {
  useLoginHook()
  return (
    <>
      <Atention />
    </>
  );
}
