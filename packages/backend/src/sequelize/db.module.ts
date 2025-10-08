import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '8284',
      database: 'tortas_fritas_ft',
      logging: false,
      native: false,
      autoLoadModels: true,
    })
  ],
  providers: [],
  exports: [],
})
export class DbModule { }
