
export interface CreateIncomeParams {
    amount: number,
    category: string,
    date: Date
}

export interface UpdateIncomeParams {
    id: string,
    amount?: number,
    category?: string,
    date?: Date
}