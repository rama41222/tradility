import { Injectable } from '@nestjs/common';
import { FixerService } from 'src/modules/fixer/fixer.service';
import { Fixer } from '../fixer/model/fixer.model';
import { ConvertInput } from './dto/inputs/convert.input';
import { Trade } from './models/trade.model';

@Injectable({})
export class TradeService {
  constructor(private readonly fixerService: FixerService) {}

  fetchTrades(): Trade {
    return this.fixerService.fetchMock();
  }

  fetchFixers(): Fixer[] {
    const trades = this.fixerService.fetchMock();
    return this.fixerService.majorCurrencyValues(trades);
  }

  fetchAnyFixers(): Fixer[] {
    const trades = this.fixerService.fetchMock();
    return this.fixerService.majorCurrencyValues(trades);
  }

  fetchCustomConversions(convertPair: ConvertInput[]): Fixer[] {
    const trades = this.fixerService.fetchMock();
    return this.fixerService.anyCurrencyValue(trades, convertPair);
  }
}
