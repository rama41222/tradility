import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FixerService } from '../fixer/fixer.service';

/**
 * Fixer module imports, providers and exports
 */
@Module({
  imports: [HttpModule],
  providers: [FixerService, ConfigService],
  exports: [FixerService],
})
export class FixerModule {}
