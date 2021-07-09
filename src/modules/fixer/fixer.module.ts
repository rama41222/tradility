import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FixerService } from '../fixer/fixer.service';

@Module({
  imports: [HttpModule],
  providers: [FixerService],
  exports: [FixerService],
})
export class FixerModule {}
