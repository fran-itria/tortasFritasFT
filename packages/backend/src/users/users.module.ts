import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Orders } from 'src/orders/orders.model';

@Module({
    imports: [SequelizeModule.forFeature([Users, Orders])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule { }
