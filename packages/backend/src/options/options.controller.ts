import { Controller, Delete, Get, NotFoundException, Post, Put, Req, Res } from "@nestjs/common";
import { OptionsService } from "./options.service";
import express from "express";


@Controller('options')
export class OptionsController {
    constructor(private readonly optionsService: OptionsService) { }

    @Get()
    async getOptions(@Req() req: express.Request, @Res() res: express.Response) {
        const options = await this.optionsService.findAll();
        if (options.length > 0) {
            res.status(200).json(options);
        } else {
            throw new NotFoundException('No se encontraron opciones');
        }
    }

    @Post()
    async createOptions(@Req() req: express.Request, @Res() res: express.Response) {
        const newOptions = await this.optionsService.createOptions()
        if (newOptions) {
            res.status(201).json(newOptions);
        } else {
            throw new NotFoundException('No se ha podido crear las opciones');
        }
    }

    @Delete()
    async deleteOptions(@Req() req: express.Request, @Res() res: express.Response) {
        const { id } = req.body
        await this.optionsService.deleteOptions(id)
        res.status(200).json({ message: "Configuración eliminada correctamente" })
    }

    @Put()
    async updateOptions(@Req() req: express.Request, @Res() res: express.Response) {
        await this.optionsService.updateOptions(req.body)
        res.status(200).json({ message: "Configuración actualizada correctamente" })
    }
}