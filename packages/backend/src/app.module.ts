import { Module } from '@nestjs/common';
import { DbModule } from './sequelize/db.module';
import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [
    DbModule,
    AdminModule,
    PublicModule
  ],
  controllers: [],
})
export class AppModule { }
