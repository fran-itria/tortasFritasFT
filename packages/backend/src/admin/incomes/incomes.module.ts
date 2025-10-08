import { Module } from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { IncomesController } from './incomes.controller';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { Incomes } from './income.model';

@Module({
  imports: [SequelizeModule.forFeature([Incomes])],
  providers: [IncomesService],
  controllers: [IncomesController]
})
export class IncomesModule { }
