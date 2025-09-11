export enum Method {
    CASH = 'cash',
    TRANSFER = 'transfer'
}
export interface CreateOrdersProps {
    userId: string,
    paymentMethod: Method,
    cash?: number,
    products: { quantity: number, productId: string, varity?: string }[]
}