import { Args, Query, Resolver } from '@nestjs/graphql';
import { Fixer } from '../fixer/model/fixer.model';
import { ConvertInput } from './dto/inputs/convert.input';
import { Trade } from './models/trade.model';
import { TradeService } from './trade.service';

@Resolver(() => Trade)
export class TradeResolver {
  constructor(private readonly tradeService: TradeService) {}

  @Query(() => Trade, { name: 'trade', nullable: false })
  getRates(): Trade {
    const trades = this.tradeService.fetchTrades();
    return trades;
  }

  @Query(() => [Fixer], { name: 'fixers', nullable: false })
  getMajorCurrencyRates(): Fixer[] {
    return this.tradeService.fetchFixers();
  }

  @Query(() => [Fixer])
  convert(
    @Args({ name: 'pairs', type: () => [ConvertInput] })
    pairs: Array<ConvertInput>,
  ): Fixer[] {
    return this.tradeService.fetchCustomConversions(pairs);
  }
}
