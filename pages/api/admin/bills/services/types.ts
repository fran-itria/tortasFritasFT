
export interface CreateBillsParams {
    amount: number,
    category: string,
    date: Date
}

export interface UpdateBillsParams {
    id: string,
    amount?: number,
    category?: string,
    date?: Date
}