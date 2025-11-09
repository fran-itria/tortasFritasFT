'use client'
import ProductCard from "@/components/Home/ProductCard";
import useLoginHook from "hooks/useLoginHook";
import useProductsHook from "hooks/useProductsHook";
import { useUserState } from "@/zustand/userState"
import useThemeState from "@/zustand/theme";
import { AddCircleIcon } from "@/components/Icons";


export default function Home() {
  useLoginHook()
  const { theme } = useThemeState(state => state)
  const { user } = useUserState(state => state)
  const { products } = useProductsHook()
  return (
    <>
      <div className={`grid grid-cols-2`}>
        {products && products.length > 0 && (
          products.map((p, i) => (
            <ProductCard
              key={p.id}
              isAdmin={user?.admin || false}
              index={{ current: i, total: products.length }}
              id={p.id}
              soldOut={p.soldOut}
              amount={p.amount}
              name={p.name}
              description={p.description}
              image={p.image}
              varity={p.varity} />
          ))
        )}
        {user?.admin && (
          <div className='flex flex-col justify-center items-center p-5'>
            <div
              className={`
                ${theme == 'dark' ?
                  'bg-[#00011A] shadow-[7px_7px_7px_rgba(255,255,255,0.40)]'
                  :
                  'bg-white shadow-[7px_7px_7px_rgba(0,0,0,0.70)]'
                }
                flex items-center justify-center
                rounded-xl
                w-60 h-90
                max-xs:w-45
                shadow-xl/70
            `}
            >
              <button className="w-fit h-full">
                <AddCircleIcon />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
