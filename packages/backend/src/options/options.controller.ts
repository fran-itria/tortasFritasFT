import { Controller, Delete, Get, NotFoundException, Post, Put, Req, Res } from "@nestjs/common";
import { OptionsService } from "./options.service";
import express from "express";


@Controller('options')
export class OptionsController {
    constructor(private readonly optionsService: OptionsService) { }

    @Get()
    async getOptions(@Req() _req: express.Request, @Res() res: express.Response) {
        const options = await this.optionsService.findAll();
        if (options) {
            res.status(200).json(options);
        } else {
            throw new NotFoundException('No se encontraron opciones');
        }
    }
}