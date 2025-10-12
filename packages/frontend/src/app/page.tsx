'use client'

import Atention from "@/components/Home/Atention";
import ProductCard from "@/components/Home/ProductCard";
import useLoginHook from "hooks/useLoginHook";
import useProductsHook from "hooks/useProductsHook";
import { useRouter } from "next/navigation";
import { useUserState } from "@/zustand/userState"
import AdminHeader from "@/components/Home/AdminHeader";


export default function Home() {
  useLoginHook()
  const { user } = useUserState(state => state)
  const { products } = useProductsHook()
  const { push } = useRouter()
  return (
    <>
      {!user?.admin ?
        <Atention />
        :
        <AdminHeader />
      }
      <div className="grid grid-cols-2">
        {products && products.length > 0 && (
          products.map((p, i) => (
            <ProductCard
              key={p.id}
              isAdmin={user?.admin || false}
              push={push}
              index={{ current: i, total: products.length }}
              id={p.id}
              amount={p.amount}
              name={p.name}
              description={p.description}
              image={p.image}
              varity={p.varity} />
          ))
        )}
      </div>
    </>
  );
}
