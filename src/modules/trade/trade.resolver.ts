import { Query, Resolver } from '@nestjs/graphql';
import { Fixer } from '../fixer/model/fixer.model';
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

  @Query(() => [Fixer])
  getMajorCurrencyRates(): Fixer[] {
    return this.tradeService.fetchFixers();
  }

  @Query(() => [Fixer])
  convert(): Fixer[] {
    return this.tradeService.fetchFixers();
  }
}
