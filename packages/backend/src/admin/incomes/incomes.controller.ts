import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import express from 'express';
import * as incomesService from './incomes.service';
import * as incomesModel from './incomes.model';

@Controller('admin/incomes')
export class IncomesController {
    constructor(private readonly incomesService: incomesService.IncomesService) { }

    @Get()
    async findAll(@Res() res: express.Response) {
        const incomes = await this.incomesService.findAll();
        res.status(200).json(incomes);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: express.Response) {
        const income = await this.incomesService.findById(id);
        res.status(200).json(income);
    }

    @Post()
    async create(@Body() createIncomes: incomesModel.CreateIncomes, @Res() res: express.Response) {
        const newIncome = await this.incomesService.create(createIncomes);
        res.status(201).json(newIncome);
    }

    @Put()
    async update(@Body() updateIncomes: incomesService.UpdateIncomeParams, @Res() res: express.Response) {
        const updatedIncome = await this.incomesService.update(updateIncomes);
        res.status(200).json(updatedIncome);
    }

    @Delete()
    async delete(@Body('id') id: string, @Res() res: express.Response) {
        await this.incomesService.delete(id);
        res.status(200).json({ message: "Ingreso eliminado correctamente" });
    }
}
