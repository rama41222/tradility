import { Injectable, Logger } from '@nestjs/common';
import { FixerService } from 'src/modules/fixer/fixer.service';
import { Fixer } from '../fixer/model/fixer.model';
import { ConvertInput } from './dto/inputs/convert.input';
import { Trade } from './models/trade.model';

@Injectable({})
export class TradeService {
  private readonly logger = new Logger(TradeService.name);
  
  constructor(private readonly fixerService: FixerService) {}

  /**
   * Fetches the trades
   * @returns Promise<Trade>
   */
  async fetchTrades(): Promise<Trade> {
    return this.fixerService.fetch();
  }

  /**
   * Fetches data from fixer api through fixer
   * @returns Promise<Fixer[]>
   */
  async fetchFixers(): Promise<Fixer[]> {
    const trades = await this.fixerService.fetch();
    return this.fixerService.majorCurrencyValues(trades);
  }

  /**
   * Takes a currecny pair and covert it.
   * @param convertPair Currency pair
   * @returns Promise<Fixer[]>
   */
  async fetchCustomConversions(convertPair: ConvertInput[]): Promise<Fixer[]> {
    try {
      const trades = await this.fixerService.fetch();
      return this.fixerService.anyCurrencyValue(trades, convertPair);
    } catch (e) {
      this.logger.error('Fixer API Error', e.message);
      throw new Error(`Fixer API Error \n ${e}`);
    }
  }
}
