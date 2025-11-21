import { Controller, Get, NotFoundException, Req, Res } from "@nestjs/common";
import { OptionsService } from "./options.service";
import type { Request, Response } from "express";


@Controller('options')
export class OptionsController {
    constructor(private readonly optionsService: OptionsService) { }

    @Get()
    async getOptions(@Req() _req: Request, @Res() res: Response) {
        const options = await this.optionsService.findAll();
        if (options) {
            res.status(200).json(options);
        } else {
            throw new NotFoundException('No se encontraron opciones');
        }
    }
}