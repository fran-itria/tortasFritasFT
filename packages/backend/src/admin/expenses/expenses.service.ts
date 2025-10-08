import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Expenses } from './expense.model';

interface CreateIncomeProps {
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

@Injectable()
export class ExpensesService {
    constructor(
        @InjectModel(Expenses)
        private readonly expensesModel: typeof Expenses
    ) { }

    async findAll(): Promise<Expenses[]> {
        const incomes = await this.expensesModel.findAll({
            order: [['date', 'DESC']]
        });
        if (incomes.length == 0) throw new NotFoundException('No hay gastos registrados');
        return incomes
    }

    async findById(id: string): Promise<Expenses | null> {
        if (!id) throw new BadRequestException("El id es obligatorio");
        const expense = await this.expensesModel.findByPk(id);
        if (!expense) throw new NotFoundException("Gasto no encontrado");
        return expense;
    }

    async create({ amount, category, date }: CreateIncomeProps): Promise<Expenses> {
        if (!amount || !category || !date) throw new BadRequestException("Faltan datos obligatorios")
        const newExpense = await this.expensesModel.create({ amount, category, date })
        if (!newExpense) throw new Error("No se pudo crear el gasto")
        return newExpense
    }

    async delete(id: string): Promise<void> {
        if (!id) throw new BadRequestException("Falta el id")
        const deleteExpense = await this.expensesModel.destroy({ where: { id } })
        if (deleteExpense) return
        throw new NotFoundException("No se pudo eliminar el gasto")
    }

    async update({ id, amount, category, date }: UpdateIncomeParams): Promise<number> {
        if (!id) throw new BadRequestException("Falta el id")
        const [update] = await this.expensesModel.update(
            {
                amount,
                category,
                date
            },
            {
                where: { id }
            }
        )
        if (!update) throw new NotFoundException("No se encuentra el gasto a actualizar")
        return update
    }
}
