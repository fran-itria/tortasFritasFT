import { Module } from '@nestjs/common';
import { DbProvider } from './db.service';

@Module({
  imports: [],
  providers: [DbProvider],
  exports: [DbProvider],
})
export class DbModule {}
