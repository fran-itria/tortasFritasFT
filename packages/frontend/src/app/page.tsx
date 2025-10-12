'use client'

import Atention from "@/components/Home/Atention";
import ProductCard from "@/components/Home/ProductCard";
import useLoginHook from "hooks/useLoginHook";
import useProductsHook from "hooks/useProductsHook";

export default function Home() {
  useLoginHook()
  const { products } = useProductsHook()
  return (
    <>
      <Atention />
      <div className="grid grid-cols-2">
        {products && products.length > 0 && (
          products.map((p, i) => (
            <ProductCard
              key={p.id}
              index={{ current: i, total: products.length }}
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
