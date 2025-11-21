import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import type { Response } from 'express';
import * as expensesService from './expenses.service';
import * as expensesModel from './expense.model';

@Controller('admin/expenses')
export class ExpensesController {
    constructor(private readonly expensesService: expensesService.ExpensesService) { }

    @Get()
    async findAll(@Res() res: Response) {
        const expenses = await this.expensesService.findAll();
        res.status(200).json(expenses);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response) {
        const expense = await this.expensesService.findById(id);
        res.status(200).json(expense);
    }

    @Post()
    async create(@Body() createExpenses: expensesModel.CreateExpenses, @Res() res: Response) {
        const newExpense = await this.expensesService.create(createExpenses);
        res.status(201).json(newExpense);
    }

    @Put()
    async update(@Body() updateExpenses: expensesService.UpdateIncomeParams, @Res() res: Response) {
        const updatedExpense = await this.expensesService.update(updateExpenses);
        res.status(200).json(updatedExpense);
    }

    @Delete()
    async delete(@Body('id') id: string, @Res() res: Response) {
        await this.expensesService.delete(id);
        res.status(200).json({ message: "Gasto eliminado correctamente" });
    }
}
