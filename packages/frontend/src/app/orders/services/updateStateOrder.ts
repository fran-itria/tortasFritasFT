import { alerts } from "@/alerts/alerts";
import { ApiError } from "@/lib/axios";
import { OrdersServiceApi } from "@/services/api";
import { AlertsSuccess } from "@/utils/constAlerts";
import { constLoader } from "@/utils/constLoader";
import { constOrdersCompare } from "@/utils/constOrders";
import { Dispatch, SetStateAction } from "react";

interface Props {
    setUpdateOrder: Dispatch<SetStateAction<boolean>>
    setLoader: Dispatch<SetStateAction<string>>
    setShowModal: Dispatch<SetStateAction<boolean>>
    orderId: string,
    state: constOrdersCompare,
    theme: string
}

export default async function updateStateOrder({ orderId, state, theme, setLoader, setUpdateOrder, setShowModal }: Props) {
    setLoader(constLoader.updateOrder);
    setShowModal(false);
    try {
        await OrdersServiceApi.updateStatus({ orderId, state });
        setUpdateOrder(prev => !prev);
        setLoader('');
        alerts('success', theme, AlertsSuccess.ORDER_STATUS_UPDATED);
    } catch (error) {
        setLoader('');
        if (error instanceof ApiError)
            alerts('error', theme, error.message)
    }
}