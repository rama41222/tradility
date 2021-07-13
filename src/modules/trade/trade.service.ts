import { Injectable } from '@nestjs/common';
import { FixerService } from 'src/modules/fixer/fixer.service';
import { Fixer } from '../fixer/model/fixer.model';
import { ConvertInput } from './dto/inputs/convert.input';
import { Trade } from './models/trade.model';

@Injectable({})
export class TradeService {
  constructor(private readonly fixerService: FixerService) {}

  /**
   * Fetches the trades
   * @returns Trade
   */
  fetchTrades(): Trade {
    return this.fixerService.fetchMock();
  }

  /**
   * Fetches data from fixer api through fixer
   * @returns {Fixer[]}
   */
  fetchFixers(): Fixer[] {
    const trades = this.fixerService.fetchMock();
    return this.fixerService.majorCurrencyValues(trades);
  }

  /**
   * Takes a currecny pair and covert it.
   * @param convertPair Currency pair
   * @returns Fixer[]
   */
  fetchCustomConversions(convertPair: ConvertInput[]): Fixer[] {
    const trades = this.fixerService.fetchMock();
    return this.fixerService.anyCurrencyValue(trades, convertPair);
  }
}
