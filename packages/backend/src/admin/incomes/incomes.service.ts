import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Incomes } from './income.model';

interface CreateIncomeProps {
    amount: number,
    category: string,
    date: Date
}

export interface UpdateIncomeParams {
    id: string,
    amount?: number,
    category?: 'cash' | 'transfer',
    date?: Date
}

@Injectable()
export class IncomesService {
    constructor(
        @InjectModel(Incomes)
        private readonly incomesModel: typeof Incomes
    ) { }

    async findAll(): Promise<Incomes[]> {
        const incomes = await this.incomesModel.findAll({
            order: [['date', 'DESC']]
        });
        if (incomes.length == 0) throw new NotFoundException('No hay ingresos registrados');
        return incomes
    }

    async findById(id: string): Promise<Incomes | null> {
        if (!id) throw new BadRequestException("El id es obligatorio");
        const income = await this.incomesModel.findByPk(id);
        if (!income) throw new NotFoundException("Ingreso no encontrado");
        return income;
    }

    async create({ amount, category, date }: CreateIncomeProps): Promise<Incomes> {
        if (!amount || !category || !date) throw new BadRequestException("Faltan datos obligatorios")
        const newIncome = await this.incomesModel.create({ amount, category, date })
        if (!newIncome) throw new Error("No se pudo crear el ingreso")
        return newIncome
    }

    async delete(id: string): Promise<void> {
        if (!id) throw new BadRequestException("Falta el id")
        const deleteIncome = await this.incomesModel.destroy({ where: { id } })
        if (deleteIncome) return
        throw new NotFoundException("No se pudo eliminar el ingreso")
    }

    async update({ id, amount, category, date }: UpdateIncomeParams): Promise<number> {
        if (!id) throw new BadRequestException("Falta el id")
        const [update] = await this.incomesModel.update(
            {
                amount,
                category,
                date
            },
            {
                where: { id }
            }
        )
        if (!update) throw new NotFoundException("No se encuentra el ingreso a actualizar")
        return update
    }
}
