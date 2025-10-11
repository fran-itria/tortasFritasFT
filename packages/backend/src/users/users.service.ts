import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users, UserCreationAttributes } from './user.model';
import jwt from "jsonwebtoken";
import { Orders } from 'src/orders/order.model';

export interface UpdateUserProps {
    id: string
    name?: string
    surname?: string
    email?: string
    phone?: string
    admin?: boolean
    active?: boolean
}

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users)
        private readonly usersModel: typeof Users
    ) { }

    async findAll(): Promise<Users[]> {
        const users = await this.usersModel.findAll({
            include: [Orders]
        })
        if (users.length > 0) return users
        else throw new NotFoundException('No hay usuarios registrados')
    }

    async findById(id: string): Promise<Users> {
        const user = await this.usersModel.findByPk(id, { include: [Orders] })
        if (user) return user
        else throw new NotFoundException('Usuario no encontrado')
    }

    async create(params: UserCreationAttributes): Promise<{ user: Users; token: string }> {
        process.loadEnvFile()
        const { SECRET_KEY } = process.env;
        const { id, name, surname, email } = params
        if (!id || !name || !surname || !email) {
            throw new BadRequestException('Faltan datos obligatorios')
        }
        const newUser = await this.usersModel.create({
            id,
            name,
            surname,
            email
        })
        const token = jwt.sign({ id: newUser.id, admin: newUser.admin }, SECRET_KEY, { expiresIn: '2h' });
        jwt.verify(token, SECRET_KEY);
        return { user: newUser, token };
    }

    async update(body: UpdateUserProps): Promise<Number> {
        const { id, name, surname, email, phone, admin, active } = body
        if (!id) throw new BadRequestException('ID de usuario es obligatorio');
        const [affectedRows] = await Users.update(
            {
                name,
                surname,
                email,
                phone,
                admin,
                active
            },
            {
                where: {
                    id
                }
            }
        )
        if (affectedRows > 0) {
            return affectedRows
        } else {
            throw new NotFoundException('No se pudo actualizar el usuario');
        }
    }

    async login(email: string): Promise<{ user: Users; token: string }> {
        process.loadEnvFile()
        const { SECRET_KEY } = process.env;
        const user: any = await this.usersModel.findOne({ where: { email } });
        if (!user) throw new NotFoundException('Usuario no encontrado');
        if (!SECRET_KEY) {
            throw new Error('No se puede iniciar sesión en este momento, intente más tarde');
        }
        const token = jwt.sign({ id: user.id, admin: user.dataValues.admin }, SECRET_KEY, { expiresIn: '2h' });
        jwt.verify(token, SECRET_KEY);
        return { user, token };
    }

    async loginWithToken(token: string): Promise<Users> {
        process.loadEnvFile()
        if (!token) {
            throw new BadRequestException('Token es requerido');
        }
        try {
            const data: any = jwt.verify(token, process.env.SECRET_KEY);
            const user = await this.usersModel.findByPk(data.id);
            if (!user) {
                throw new NotFoundException('Usuario no encontrado, inicie sesión nuevamente');
            }
            return user;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new UnauthorizedException('Token inválido o expirado');
        }
    }
}
