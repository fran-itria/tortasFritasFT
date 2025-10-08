import { Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { OrdersService } from './orders.service';
import express from "express";

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ) { }

    @Get()
    async findAll(@Req() _req: express.Request, @Res() res: express.Response) {
        const orders = await this.ordersService.findAll();
        res.status(200).json(orders);
    }

    @Get('/:id')
    async findById(@Req() req: express.Request, @Res() res: express.Response) {
        const { id } = req.params
        const order = await this.ordersService.findById(id)
        res.status(200).json(order);
    }

    @Post('/create')
    async create(@Req() req: express.Request, @Res() res: express.Response) {
        const body = req.body
        const order = await this.ordersService.create(body)
        res.status(201).json(order);
    }

    @Put()
    async cancelOrder(@Req() req: express.Request, @Res() res: express.Response) {
        const { id } = req.body
        const order = await this.ordersService.cancelOrder(id)
        res.status(200).json(order);
    }
}
