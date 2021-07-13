import { Module } from '@nestjs/common';
import { FixerModule } from '../fixer/fixer.module';
import { TradeResolver } from './trade.resolver';
import { TradeService } from './trade.service';

/**
 * Trade module imports and providers
 */
@Module({
  imports: [FixerModule],
  providers: [TradeResolver, TradeService],
})
export class TradeModule {}
