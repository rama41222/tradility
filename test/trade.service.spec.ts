import { Test, TestingModule } from '@nestjs/testing';
import { FixerModule } from '../src/modules/fixer/fixer.module';
import { TradeResolver } from '../src/modules/trade/trade.resolver';
import { TradeService } from '../src/modules/trade/trade.service';
import * as FixerData from '../src/modules/fixer/mocker/fixer.response.json';

describe('Trade Service', () => {
  let tradeService: TradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FixerModule],
      providers: [TradeResolver, TradeService],
    }).compile();

    tradeService = module.get(TradeService);
  });

  it('trade module to be defined', async () => {
    expect(tradeService).toBeDefined();
  });

  it('trades to be defined', async () => {
    const trades = FixerData;
    jest
      .spyOn(tradeService, 'fetchTrades')
      .mockImplementation(async () => FixerData);
    expect(trades).toBeTruthy();
    expect(await tradeService.fetchTrades()).toBe(FixerData);
  });

  it('trades to have properties', async () => {
    const trades = FixerData;
    jest
      .spyOn(tradeService, 'fetchTrades')
      .mockImplementation(async () => FixerData);
    expect(trades).toBeTruthy();
    const mockData = await tradeService.fetchTrades();

    expect(mockData).toHaveProperty('timestamp');
    expect(mockData).toHaveProperty('base');
    expect(mockData).toHaveProperty('date');
    expect(mockData).toHaveProperty('rates');
  });
});
