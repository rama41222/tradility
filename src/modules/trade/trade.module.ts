import { Module } from '@nestjs/common';
import { TradeResolver } from './trade.resolver';
import { TradeService } from './trade.service';

@Module({
  providers: [TradeResolver, TradeService],
})
export class TradeModule {}
