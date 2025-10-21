import { Controller, Get, NotFoundException, Req, Res } from '@nestjs/common';
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
        if (products.length == 0) throw new NotFoundException('No hay productos registrados');
        res.status(200).json(products);
    }

    @Get('/:id')
    async findById(@Req() req: express.Request, @Res() res: express.Response) {
        const { id } = req.params;
        const products = await this.productsService.findById(id);
        res.status(200).json(products);
    }
}
