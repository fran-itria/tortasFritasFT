
export interface CreateExpenseParams {
    amount: number,
    category: string,
    date: Date
}

export interface UpdateExpenseParams {
    id: string,
    amount?: number,
    category?: string,
    date?: Date
}