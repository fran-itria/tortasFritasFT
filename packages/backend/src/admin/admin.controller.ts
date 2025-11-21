import { Controller, Delete, Get, NotFoundException, Post, Put, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
import {
    AdminOptionsService,
    AdminOrdersService,
    AdminProductsService,
    AdminUsersService
} from "./admin.service";


@Controller('admin/options')
export class AdminOptionsController {
    constructor(private readonly adminService: AdminOptionsService) { }

    @Post()
    async createOptions(@Req() _req: Request, @Res() res: Response) {
        const newOptions = await this.adminService.createOptions()
        if (newOptions) {
            res.status(201).json(newOptions);
        } else {
            throw new NotFoundException('No se ha podido crear las opciones');
        }
    }

    @Delete()
    async deleteOptions(@Req() req: Request, @Res() res: Response) {
        const { id } = req.body
        await this.adminService.deleteOptions(id)
        res.status(200).json({ message: "Configuración eliminada correctamente" })
    }

    @Put()
    async updateOptions(@Req() req: Request, @Res() res: Response) {
        await this.adminService.updateOptions(req.body)
        res.status(200).json({ message: "Configuración actualizada correctamente" })
    }
}

@Controller('admin/users')
export class AdminUsersController {
    constructor(private readonly adminService: AdminUsersService) { }
    @Get()
    async findAll(@Req() _req: Request, @Res() res: Response) {
        const users = await this.adminService.findAll();
        res.status(200).json(users);
    }

    @Get(':id')
    async findById(@Req() req: Request, @Res() res: Response) {
        const { id } = req.params;
        const user = await this.adminService.findById(id);
        res.status(200).json(user);
    }

    @Put('/changeActiveStatus')
    async changeActiveStatus(@Req() req: Request, @Res() res: Response) {
        const { id, active } = req.body
        await this.adminService.changeActiveStatus(id, active)
        const message = active ? "Usuario habilitado correctamente" : "Usuario eliminado correctamente"
        res.status(200).json({ message })
    }


    @Put('/changeAdminStatus')
    async changeAdminStatus(@Req() req: Request, @Res() res: Response) {
        const { id, admin } = req.body
        await this.adminService.changeAdminStatus(id, admin)
        res.status(200).json({ message: "Estado de administrador actualizado correctamente" })
    }
}

@Controller('admin/orders')
export class AdminOrdersController {
    constructor(private readonly adminService: AdminOrdersService) { }

    @Put()
    async updateState(@Req() req: Request, @Res() res: Response) {
        const order = await this.adminService.updateState(req.body.id, req.body.state)
        res.status(200).json(order)
    }
}

@Controller('/admin/products')
export class AdminProductsController {
    constructor(private readonly adminService: AdminProductsService) { }

    @Post('/bulkCreate')
    async bulkCreateProducts(@Req() req: Request, @Res() res: Response) {
        const products = req.body
        console.log(products);
        for (const element of products) {
            if (element.varity) {
                for (const varityElement of element.varity) {
                    varityElement.id = crypto.randomUUID();
                }
            }
        }
        const createProducts = await this.adminService.bulkCreate(req.body)
        res.status(201).json(createProducts)
    }

    @Post()
    async createProduct(@Req() req: Request, @Res() res: Response) {
        const product = await this.adminService.create(req.body)
        res.status(201).json(product)
    }

    @Put('/soldOut')
    async soldOutProduct(@Req() req: Request, @Res() res: Response) {
        const { id } = req.body
        await this.adminService.soldOut(id)
        res.status(200).json({ message: "Producto marcado como agotado" })
    }

    @Put()
    async updateProduct(@Req() req: Request, @Res() res: Response) {
        const product = await this.adminService.update(req.body)
        res.status(200).json(product)
    }
}