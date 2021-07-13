import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FixerService } from '../fixer/fixer.service';
import { Cache } from 'cache-manager';

/**
 * Fixer module imports, providers and exports
 */
@Module({
  imports: [HttpModule, CacheModule.register()],
  providers: [FixerService, ConfigService],
  exports: [FixerService],
})
export class FixerModule {}
