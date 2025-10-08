import { Module } from '@nestjs/common';
import { DbModule } from './db.module';
import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public.module';

@Module({
  imports: [
    DbModule,
    AdminModule,
    PublicModule
  ],
  controllers: [],
})
export class AppModule { }
