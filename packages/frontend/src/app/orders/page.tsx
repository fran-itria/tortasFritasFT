'use client'
import { Theme } from "@/utils/constTheme";
import Loading from "@/components/loading";
import useOrdersHook from "./useOrdersHook";
import { constOrders, constOrdersCompare } from "@/utils/constOrders";
import updateStateOrder from "./services/updateStateOrder";
import whatssapLink from "./services/whatssapMessage";

export default function OrdersPage() {
    const {
        orders,
        loader,
        setLoader,
        setUpdateOrder,
        orderId,
        setOrderId,
        setShowModal,
        showModal,
        theme,
        router,
        setUserPhone,
        userPhone
    } = useOrdersHook()

    const sendMessage = (state: constOrdersCompare) => {
        updateStateOrder({ orderId, state, theme, setLoader, setUpdateOrder, setShowModal })
        const link = whatssapLink(userPhone as string, state)
        router.push(link)
    }
    return (
        <div className="px-6">
            {loader && <Loading text={loader} />}
            <table className={`
            w-full 
            font-bold
            rounded-t-lg
            rounded-b-0
            border-separate border-3 border-spacing-2
            ${loader || showModal && 'opacity-50 pointer-events-none'} 
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
                                    <div className="flex flex-col" key={product.id}>
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
                                <button onClick={() => {
                                    setShowModal(true)
                                    setOrderId(order.id)
                                    setUserPhone(String(order.user.phone))
                                }}>
                                    {order.state == constOrdersCompare.pending ? constOrders.pending
                                        :
                                        order.state == constOrdersCompare.accept ? constOrders.accept
                                            :
                                            order.state == constOrdersCompare.completed ? constOrders.completed
                                                :
                                                order.state == constOrdersCompare.delivered ? constOrders.delivered
                                                    :
                                                    order.state == constOrdersCompare.cancel ? constOrders.cancel
                                                        :
                                                        constOrders.rejected
                                    }
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal &&
                <div className={`
                            opacity-100
                            absolute
                            top-0
                            left-0
                            w-full
                            h-full
                            z-10
                            flex
                            justify-center
                            items-center
                    `}>
                    <div
                        className={`
                            flex 
                            flex-col
                            rounded-lg 
                            bg-linear-to-b
                            w-40
                            font-bold
                            ${theme == Theme.DARK ? 'from-dark-background-button to-dark-tertiary' : 'from-light-background-button to-light-tertiary'}
                        `}>
                        <button
                            name={constOrdersCompare.accept}
                            onClick={() => sendMessage(constOrdersCompare.accept)}
                            className="p-2 text-green-400 rounded-t-lg border-b-2 border-white"
                        >
                            Aceptar
                        </button>
                        <button
                            name={constOrdersCompare.rejected}
                            onClick={() => sendMessage(constOrdersCompare.rejected)}
                            className="p-2 text-red-400 rounded-none border-b-2 border-t-2 border-white"
                        >
                            Rechazar
                        </button>
                        <button
                            name={constOrdersCompare.completed}
                            onClick={() => sendMessage(constOrdersCompare.completed)}
                            className="p-2 text-yellow-400 rounded-none border-b-2 border-t-2 border-white"
                        >
                            Listo para retirar
                        </button>
                        <button
                            onClick={() => updateStateOrder({ orderId, state: constOrdersCompare.delivered, theme, setLoader, setUpdateOrder, setShowModal })}
                            className="p-2 text-sky-400 rounded-none border-b-2 border-t-2 border-white"
                        >
                            Entregado
                        </button>
                        <button onClick={() => setShowModal(false)} className="p-2 border-t-2 rounded-b-lg text-white"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}