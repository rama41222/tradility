import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as FixerData from './mocker/fixer.response.json';
import { Cron, CronExpression } from '@nestjs/schedule';
import { converter } from './fixer.utils';
import { Trade } from '../trade/models/trade.model';
import { MainCurrency, MainCurrencyConversions } from './fixer.types.model';
import { Fixer } from './model/fixer.model';

@Injectable({})
export class FixerService {
  private readonly logger = new Logger(FixerService.name);

  constructor(private readonly httpService: HttpService) {}

  fetch(): Observable<AxiosResponse<unknown[]>> {
    return this.httpService.get('http://localhost:3000/cats');
  }

  fetchMock(): Trade {
    return FixerData;
  }

  majorCurrencyValues({ rates, timestamp, date }: Trade): Fixer[] {
    const currencies = [];
    Object.keys(MainCurrencyConversions).forEach((key) => {
      MainCurrencyConversions[key].forEach((curr: MainCurrency) => {
        currencies.push({
          from: key as MainCurrency,
          to: curr,
          rate: converter(rates[key], rates[curr]),
          timestamp,
          date,
        });
      });
    });
    return currencies;
  }

  @Cron(CronExpression.EVERY_HOUR, {
    name: 'updateRedis',
    timeZone: 'Asia/Colombo',
  })
  updateRedis() {
    this.logger.debug('Called every hour');
  }
}
