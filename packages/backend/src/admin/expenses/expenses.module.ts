import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Expenses } from './expense.model';

@Module({
  imports: [SequelizeModule.forFeature([Expenses])],
  providers: [ExpensesService],
  controllers: [ExpensesController]
})
export class ExpensesModule { }
