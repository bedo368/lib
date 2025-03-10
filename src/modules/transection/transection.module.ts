import { Module } from '@nestjs/common';
import { TransectionController } from './transection.controller';
import { TransectionService } from './transection.service';

@Module({
  controllers: [TransectionController],
  providers: [TransectionService]
})
export class TransectionModule {}
