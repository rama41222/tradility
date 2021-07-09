import { Injectable } from '@nestjs/common';
import { FixerService } from 'src/modules/fixer/fixer.service';
import { Trade } from './models/trade.model';

@Injectable({})
export class TradeService {
  constructor(private readonly fixerService: FixerService) {}
  fetchTrades(): Trade {
    return this.fixerService.fetchMock();
  }
}
