import { Query, Resolver } from '@nestjs/graphql';
import { Trade } from './models/trade.model';
import { TradeService } from './trade.service';

@Resolver(() => Trade)
export class TradeResolver {
  constructor(private readonly tradeService: TradeService) {}

  @Query(() => Trade)
  getRates(): Trade {
    const trades = this.tradeService.fetchTrades();
    return trades;
  }
}
