import { Module } from '@nestjs/common';
import { DbModule } from './sequelize/db.module';
import { OptionsModule } from './options/options.module';

@Module({
  imports: [
    DbModule,
    OptionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
