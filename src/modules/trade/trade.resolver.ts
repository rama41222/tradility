import { Args, Query, Resolver } from '@nestjs/graphql';
import { Fixer } from '../fixer/model/fixer.model';
import { ConvertInput } from './dto/inputs/convert.input';
import { Trade } from './models/trade.model';
import { TradeService } from './trade.service';

@Resolver(() => Trade)
export class TradeResolver {
  constructor(private readonly tradeService: TradeService) {}

  /**
   * This query will return all the trades
   * @returns {Promise<Trade>}
   */
  @Query(() => Trade, { name: 'trade', nullable: false })
  async getRates(): Promise<Trade> {
    const trades = await this.tradeService.fetchTrades();
    return trades;
  }

  /**
   * This query will return only the major currency conversions
   * @returns {Promise<Fixer[]>}
   */
  @Query(() => [Fixer], { name: 'fixers', nullable: false })
  async getMajorCurrencyRates(): Promise<Fixer[]> {
    return this.tradeService.fetchFixers();
  }

  /**
   * This query will return the covnersion rates for a givern number of currency pairs
   * @param pairs currency conversion apir
   * @returns Promise<Fixer[]>
   */
  @Query(() => [Fixer])
  async convert(
    @Args({ name: 'pairs', type: () => [ConvertInput] })
    pairs: Array<ConvertInput>,
  ): Promise<Fixer[]> {
    return this.tradeService.fetchCustomConversions(pairs);
  }
}
