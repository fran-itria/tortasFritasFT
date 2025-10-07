import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

@Injectable()
export class AdminMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        try {
            process.loadEnvFile()
            const { authorization } = req.headers
            if (!authorization) return res.status(401).json({ error: 'No autorizado, se requiere token' })
            jwt.verify(authorization, process.env.SECRET_KEY)
            next()
        } catch (error) {
            return res.status(401).json({ error })
        }
    }
}