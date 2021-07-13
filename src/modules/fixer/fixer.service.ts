import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as FixerData from './mocker/fixer.response.json';
import { Cron, CronExpression } from '@nestjs/schedule';
import { converter } from './fixer.utils';
import { Trade } from '../trade/models/trade.model';
import { Cache } from 'cache-manager';
import {
  MainCurrency,
  MainCurrencyConversions,
  CalculateRate,
} from './fixer.types.model';
import { Fixer } from './model/fixer.model';
import { ConfigService } from '@nestjs/config';
import RESPONSES from '../../constants';

@Injectable({})
export class FixerService {
  /** logger instance to log data */
  private readonly logger = new Logger(FixerService.name);

  /**
   * @param  {HttpService} privatereadonlyhttpService Call the http server
   */
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**
   * This function fetches all the currency conversions from
   * Fixer api
   * @returns {Observable<AxiosResponse<Trade>>} Data from Fixer API
   */
  async fetch(): Promise<Trade> {
    const fixerData = (await this.cacheManager.get('fixer_data')) as Trade;

    if (fixerData) {
      return fixerData;
    }

    /** If not avaialble, store the data with 3600 ttl */
    return new Promise((resolve, reject) => {
      this.httpService
        .get(this.configService.get<string>('api.fixer'))
        .subscribe(async (res) => {
          if (res?.data) {
            /** Cache data with 3600 ttl */
            await this.cacheManager.set('fixer_data', res.data, {
              ttl: 3600,
            });
            return resolve(res.data);
          }
          return reject(RESPONSES.ERRORS.Fixer_Api_Not_Found);
        });
    });
  }

  /**
   * This function fetch mock data from a hardcoded json
   * Just for the dev purposes
   * @returns {Promise<Trade>}
   */
  async fetchMock(): Promise<Trade> {
    /** Query cache for the fixer api data */
    const fixerData = (await this.cacheManager.get('fixer_data')) as Trade;
    if (fixerData) {
      return fixerData;
    }

    /** If not avaialble, store the data with 3600 ttl */
    await this.cacheManager.set('fixer_data', FixerData, { ttl: 3600 });
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
  @Cron(CronExpression.EVERY_10_HOURS, {
    name: 'updateRedis',
    timeZone: 'Asia/Colombo',
  })
  updateRedis() {
    this.httpService
      .get(this.configService.get<string>('api.fixer'))
      .subscribe(async (res) => {
        if (res?.data) {
          /** Cache data with 3600 ttl */
          await this.cacheManager.set('fixer_data', res.data, {
            ttl: 3600,
          });
          this.logger.verbose(RESPONSES.SUCCESS.Cron_Task_Success);
          return;
        }
        this.logger.error(RESPONSES.ERRORS.Cron_Task_Error);
      });
  }
}
