import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import express from 'express';
import * as expensesService from './expenses.service';
import * as expensesModel from './expense.model';

@Controller('admin/expenses')
export class ExpensesController {
    constructor(private readonly expensesService: expensesService.ExpensesService) { }

    @Get()
    async findAll(@Res() res: express.Response) {
        const expenses = await this.expensesService.findAll();
        res.status(200).json(expenses);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: express.Response) {
        const expense = await this.expensesService.findById(id);
        res.status(200).json(expense);
    }

    @Post()
    async create(@Body() createExpenses: expensesModel.CreateExpenses, @Res() res: express.Response) {
        const newExpense = await this.expensesService.create(createExpenses);
        res.status(201).json(newExpense);
    }

    @Put()
    async update(@Body() updateExpenses: expensesService.UpdateIncomeParams, @Res() res: express.Response) {
        const updatedExpense = await this.expensesService.update(updateExpenses);
        res.status(200).json(updatedExpense);
    }

    @Delete()
    async delete(@Body('id') id: string, @Res() res: express.Response) {
        await this.expensesService.delete(id);
        res.status(200).json({ message: "Gasto eliminado correctamente" });
    }
}
