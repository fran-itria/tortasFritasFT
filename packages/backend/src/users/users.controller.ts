import { Controller, Get, Post, Put, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import express from "express";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

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
        res.status(200).json({ message: 'Inicio de sesión exitoso', user: user.user, token: user.token });
    }

    @Put('/loginWithToken')
    async loginWithToken(@Req() req: express.Request, @Res() res: express.Response) {
        const authHeader = req.headers.authorization;
        let token: string | undefined;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }
        const user = await this.usersService.loginWithToken(token);
        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    }

}
