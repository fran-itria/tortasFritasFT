
export interface CreateOrdersProps {
    userId: string
    products: { quantity: number, productId: string, varity?: string }[]
}