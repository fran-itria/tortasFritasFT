import { OrdersServiceApi } from "@/services/api";
import { constLoader } from "@/utils/constLoader";
import useThemeState from "@/zustand/theme";
import { useUserState } from "@/zustand/userState";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Order {
    id: string,
    state: string,
    amount: number,
    paymentMethod: string,
    cash: number | null,
    userId: string,
    createdAt: string,
    updatedAt: string,
    user: {
        name: string,
        surname: string,
        phone: number | null
    },
    orderProducts: {
        id: string,
        orderId: string,
        productId: string,
        quantity: number,
        varity: string | null,
        unitPrice: number,
        totalPrice: number,
        product: {
            name: string
        }
    }[]
}

export default function useOrdersHook() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loader, setLoader] = useState<string>('');
    const [updateOrder, setUpdateOrder] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<string>('');
    const [showModal, setShowModal] = useState(false);

    const { user } = useUserState(state => state);
    const { theme } = useThemeState(state => state)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !user || !user.admin) {
            router.push('/')
        }
    }, [router, user])

    useEffect(() => {
        (async () => {
            setLoader(constLoader.getOrders)
            const response = await OrdersServiceApi.getAll()
            setOrders(response.data)
            setLoader('')
        })()
    }, [updateOrder])

    return {
        orders,
        setOrders,
        loader,
        setLoader,
        theme,
        showModal,
        setShowModal,
        setUpdateOrder,
        orderId,
        setOrderId
    }
}