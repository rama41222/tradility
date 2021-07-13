import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as FixerData from './mocker/fixer.response.json';
import { Cron, CronExpression } from '@nestjs/schedule';
import { converter } from './fixer.utils';
import { Trade } from '../trade/models/trade.model';
import {
  MainCurrency,
  MainCurrencyConversions,
  CalculateRate,
} from './fixer.types.model';
import { Fixer } from './model/fixer.model';

@Injectable({})
export class FixerService {
  /** logger instance to log data */
  private readonly logger = new Logger(FixerService.name);

  /**
   * @param  {HttpService} privatereadonlyhttpService Call the http server
   */
  constructor(private readonly httpService: HttpService) {}

  /**
   * This function fetches all the currency conversions from
   * Fixer api
   * @returns {Observable<AxiosResponse<Trade[]>>} Data from Fixer API
   */
  fetch(): Observable<AxiosResponse<unknown[]>> {
    return this.httpService.get(process.env.FIXER_API);
  }

  /**
   * This function fetch mock data from a hardcoded json
   * Just for the dev purposes
   * @returns {Trade}
   */
  fetchMock(): Trade {
    return FixerData;
  }

  /**
   * This function will return the currency conversion rate pairs
   * @param  {Trade} trade
   * @param  {string} fromCurrency
   * @param  {string} toCurrency
   * @returns CalculateRate
   */
  calcualteRate(
    trade: Trade,
    fromCurrency: string,
    toCurrency: string,
  ): CalculateRate {
    return {
      from: fromCurrency as MainCurrency,
      to: toCurrency as MainCurrency,
      rate: converter(trade.rates[fromCurrency], trade.rates[toCurrency]),
      timestamp: trade.timestamp,
      date: trade.date,
    };
  }

  /**
   * This function will return the major currency pairs
   * @param  {Trade} trade
   * @returns Fixer
   */
  majorCurrencyValues(trade: Trade): Fixer[] {
    const currencies = [];
    Object.keys(MainCurrencyConversions).forEach((key) => {
      MainCurrencyConversions[key].forEach((curr: MainCurrency) => {
        currencies.push(this.calcualteRate(trade, key, curr));
      });
    });
    return currencies;
  }

  /**
   * This function will return the rate for any currency pair
   * @param  {Trade} trade
   * @param  {} pairs
   * @param  {{from:string;to:string}} to}
   */
  anyCurrencyValue(trade: Trade, pairs): Fixer[] {
    return pairs
      .map(({ from, to }: { from: string; to: string }) => {
        if (trade.rates[from] && trade.rates[to]) {
          return this.calcualteRate(trade, from, to);
        }
      })
      .filter(Boolean);
  }

  /**
   * Cron job to update every hour
   * Fetches data from Fixer api and caches it
   */
  @Cron(CronExpression.EVERY_HOUR, {
    name: 'updateRedis',
    timeZone: 'Asia/Colombo',
  })
  updateRedis() {
    this.logger.debug('Called every hour');
  }
}
