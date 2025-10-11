import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

@Injectable()
export class AdminMiddleware implements NestMiddleware {
    use(req: Request, _res: Response, next: NextFunction) {
        process.loadEnvFile()
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new UnauthorizedException('No autorizado, se requiere token')
        const decoded = jwt.verify(authHeader, process.env.SECRET_KEY)
        if (!decoded.admin) throw new UnauthorizedException('No autorizado, se requiere ser administrador')
        next()
    }
}