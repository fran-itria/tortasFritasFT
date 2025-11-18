
export interface OptionsResponse {
    address?: string
    id?: string
    open?: { id: string, day: string, morning: string[], afternoon: string[] }[]
    ordersActive?: boolean
}