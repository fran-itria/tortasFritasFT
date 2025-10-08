import { Controller, Get, Req, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import express from "express";

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) { }

    @Get()
    async findAll(@Req() _req: express.Request, @Res() res: express.Response) {
        const products = await this.productsService.findAll();
        res.status(200).json(products);
    }

    @Get('/:id')
    async findById(@Req() req: express.Request, @Res() res: express.Response) {
        const { id } = req.params;
        const products = await this.productsService.findById(id);
        res.status(200).json(products);
    }
}
