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
          products.map(p => (
            <ProductCard
              key={p.id}
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
