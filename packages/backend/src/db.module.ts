import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

try {
  process.loadEnvFile()
} catch (error) { }
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: process.env.PG_DATABASE_URL,
      // host: 'localhost',
      // port: 5433,
      // username: 'postgres',
      // password: '8284',
      // database: 'tortas_fritas_ft',
      logging: false,
      native: false,
      autoLoadModels: true,
    })
  ],
  providers: [],
  exports: [],
})
export class DbModule { }
