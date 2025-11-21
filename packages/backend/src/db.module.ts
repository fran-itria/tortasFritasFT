import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

process.loadEnvFile()
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: process.env.PG_DATABASE_URL,
      logging: false,
      native: false,
      autoLoadModels: true,
    })
  ],
  providers: [],
  exports: [],
})
export class DbModule { }
