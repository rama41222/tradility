import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FixerService } from '../fixer/fixer.service';

/**
 * Fixer module imports, providers and exports
 */
@Module({
  imports: [HttpModule],
  providers: [FixerService],
  exports: [FixerService],
})
export class FixerModule {}
