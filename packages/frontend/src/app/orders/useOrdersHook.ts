import { OrdersServiceApi } from "@/services/api";
import { constLoader } from "@/utils/constLoader";
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

    useEffect(() => {
        (async () => {
            setLoader(constLoader.getOrders)
            const response = await OrdersServiceApi.getAll()
            console.log(response.data);
            setOrders(response.data)
            setLoader('')
        })()
    }, [])

    return { orders, setOrders, loader, setLoader }
}