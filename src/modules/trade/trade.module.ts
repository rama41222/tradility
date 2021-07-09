import { Module } from '@nestjs/common';
import { FixerModule } from '../fixer/fixer.module';
import { FixerService } from '../fixer/fixer.service';
import { TradeResolver } from './trade.resolver';
import { TradeService } from './trade.service';

@Module({
  imports: [FixerModule],
  providers: [TradeResolver, TradeService],
})
export class TradeModule {}
