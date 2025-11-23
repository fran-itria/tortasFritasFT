'use client'
import { useUserState } from "@/zustand/userState";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useThemeState from "@/zustand/theme";
import { Theme } from "@/utils/constTheme";
import Loading from "@/components/loading";
import useOrdersHook from "./useOrdersHook";
import { constOrders, constOrdersCompare } from "@/utils/constOrders";

export default function OrdersPage() {
    const { user } = useUserState(state => state);
    const { theme } = useThemeState(state => state)
    const router = useRouter()
    const { orders, loader, setLoader } = useOrdersHook()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !user || !user.admin) {
            router.back()
        }
    }, [])
    return (
        <div className="px-6">
            {loader && <Loading text={loader} />}
            <table className={`
            w-full 
            font-bold
            rounded-t-lg
            rounded-b-0
            border-separate border-3 border-spacing-2
            ${loader && 'opacity-50 pointer-events-none'} 
            ${theme == Theme.DARK ? 'bg-dark-background-button border-dark-input' : 'bg-light-tertiary border-black'}
            `}>
                <caption className="caption-top mb-2">Lista de Pedidos</caption>
                <thead>
                    <tr>
                        <th className={`border-2 ${theme == Theme.DARK ? 'bg-dark-primary border-dark-input' : 'bg-light-secondary border-black'}`}>Nombre</th>
                        <th className={`border-2 ${theme == Theme.DARK ? 'bg-dark-primary border-dark-input' : 'bg-light-secondary border-black'}`}>Monto</th>
                        <th className={`border-2 ${theme == Theme.DARK ? 'bg-dark-primary border-dark-input' : 'bg-light-secondary border-black'}`}>Metodo de pago</th>
                        <th className={`border-2 ${theme == Theme.DARK ? 'bg-dark-primary border-dark-input' : 'bg-light-secondary border-black'}`}>Productos</th>
                        <th className={`border-2 ${theme == Theme.DARK ? 'bg-dark-primary border-dark-input' : 'bg-light-secondary border-black'}`}>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="text-center">
                            <td
                                className={`
                                    border-2 
                                    ${theme == Theme.DARK ?
                                        'bg-dark-td border-dark-input'
                                        :
                                        'bg-light-td border-dark-input'
                                    }
                                `}
                            >
                                {order.user.name} {order.user.surname}
                            </td>
                            <td
                                className={`
                                    border-2 
                                    ${theme == Theme.DARK ?
                                        'bg-dark-td border-dark-input'
                                        :
                                        'bg-light-td border-dark-input'
                                    }
                                `}
                            >
                                {order.amount}
                            </td>
                            <td
                                className={`
                                    border-2 
                                    ${theme == Theme.DARK ?
                                        'bg-dark-td border-dark-input'
                                        :
                                        'bg-light-td border-dark-input'
                                    }
                                `}
                            >
                                {order.paymentMethod == constOrdersCompare.transfer ? constOrders.transfer : constOrders.cash}
                            </td>
                            <td
                                className={`
                                    border-2 
                                    ${theme == Theme.DARK ?
                                        'bg-dark-td border-dark-input'
                                        :
                                        'bg-light-td border-dark-input'
                                    }
                                `}
                            >
                                {order.orderProducts.map(product => (
                                    <div className="flex flex-col">
                                        {product.quantity} {product.product.name} {product.varity}
                                    </div>
                                ))}
                            </td>
                            <td
                                className={`
                                    border-2
                                    ${theme == Theme.DARK ?
                                        'bg-dark-td border-dark-input'
                                        :
                                        'bg-light-td border-dark-input'
                                    }
                                `}
                            >
                                {order.state == constOrdersCompare.pending ? constOrders.pending
                                    :
                                    order.state == constOrdersCompare.accept ? constOrders.accept
                                        :
                                        order.state == constOrdersCompare.completed ? constOrders.completed
                                            :
                                            order.state == constOrdersCompare.delivered ? constOrders.delivered
                                                :
                                                constOrders.cancel
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}