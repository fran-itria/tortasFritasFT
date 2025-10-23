'use client'
import ProductCard from "@/components/Home/ProductCard";
import useLoginHook from "hooks/useLoginHook";
import useProductsHook from "hooks/useProductsHook";
import { useUserState } from "@/zustand/userState"
import useModal from "hooks/useModalOpen";
import EditProduct from "@/components/Modals/EditProduct";


export default function Home() {
  useLoginHook()
  const { user } = useUserState(state => state)
  const { products, setProducts } = useProductsHook()
  const { modal, product, openModal, closeModal } = useModal()
  return (
    <>
      <div className={`grid grid-cols-2 ${modal && 'blur-lg'}`}>
        {products && products.length > 0 && (
          products.map((p, i) => (
            <ProductCard
              key={p.id}
              isAdmin={user?.admin || false}
              openModal={openModal}
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
      </div>
      {modal && <EditProduct key={product?.id} product={product} closeModal={closeModal} setProducts={setProducts} />}
    </>
  );
}
