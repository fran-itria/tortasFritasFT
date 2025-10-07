import { Module } from '@nestjs/common';
import { OptionsController } from './controllers/options.controller';
import { DbModule } from './sequelize/db.module';
import { OptionsService } from './controllers/options.service';

@Module({
  imports: [DbModule],
  controllers: [OptionsController],
  providers: [OptionsService],
})
export class AppModule {}
