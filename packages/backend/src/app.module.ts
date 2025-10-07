import { Module } from '@nestjs/common';
import { DbModule } from './sequelize/db.module';
import { OptionsModule } from './options/options.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    DbModule,
    AdminModule,
    OptionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
