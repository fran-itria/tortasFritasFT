import { Controller, Delete, NotFoundException, Post, Put, Req, Res } from "@nestjs/common";
import express from "express";
import { AdminOptionsService, AdminUsersService } from "./admin.service";


@Controller('admin/options')
export class AdminOptionsController {
    constructor(private readonly adminService: AdminOptionsService) { }

    @Post()
    async createOptions(@Req() _req: express.Request, @Res() res: express.Response) {
        const newOptions = await this.adminService.createOptions()
        if (newOptions) {
            res.status(201).json(newOptions);
        } else {
            throw new NotFoundException('No se ha podido crear las opciones');
        }
    }

    @Delete()
    async deleteOptions(@Req() req: express.Request, @Res() res: express.Response) {
        const { id } = req.body
        await this.adminService.deleteOptions(id)
        res.status(200).json({ message: "Configuración eliminada correctamente" })
    }

    @Put()
    async updateOptions(@Req() req: express.Request, @Res() res: express.Response) {
        await this.adminService.updateOptions(req.body)
        res.status(200).json({ message: "Configuración actualizada correctamente" })
    }
}

@Controller('admin/users')
export class AdminUsersController {
    constructor(private readonly adminService: AdminUsersService) { }

    @Delete()
    async inactiveUser(@Req() req: express.Request, @Res() res: express.Response) {
        const { id } = req.body
        await this.adminService.inactiveUser(id)
        res.status(200).json({ message: "Usuario eliminado correctamente" })
    }
}
