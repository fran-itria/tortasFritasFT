
export interface ProductData {
    name: string
    amount: number
    description?: string
    varity?: { name: string, stock: boolean }[]
    soldOut?: boolean
    image?: string
}
export interface BulkCreateData {
    name: string
    amount: number
    description?: string
    varity?: { name: string, stock: boolean }[]
    soldOut?: boolean
    image?: string
}[]

export interface UpdateData {
    id: string
    name?: string
    amount?: number
    description?: string
    varity?: { name: string, stock: boolean }[]
    soldOut?: boolean
    image?: string
}