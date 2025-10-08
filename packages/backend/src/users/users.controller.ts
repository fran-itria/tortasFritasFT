import { Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import express from "express";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async findAll(@Req() req: express.Request, @Res() res: express.Response) {
        const users = await this.usersService.findAll();
        res.status(200).json(users);
    }

    @Get(':id')
    async findById(@Req() req: express.Request, @Res() res: express.Response) {
        const { id } = req.params;
        const user = await this.usersService.findById(id);
        res.status(200).json(user);
    }

    @Post()
    async create(@Req() req: express.Request, @Res() res: express.Response) {
        const newUser = await this.usersService.create(req.body);
        res.status(201).json({ message: 'Usuario creado exitosamente', newUser });
    }

    @Put()
    async update(@Req() req: express.Request, @Res() res: express.Response) {
        await this.usersService.update(req.body);
        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    }

    @Put('/login')
    async login(@Req() req: express.Request, @Res() res: express.Response) {
        const user = await this.usersService.login(req.body.email);
        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    }

    @Put('/loginWithToken')
    async loginWithToken(@Req() req: express.Request, @Res() res: express.Response) {
        const { token } = req.headers;
        const user = await this.usersService.loginWithToken(token as string);
        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    }

}
