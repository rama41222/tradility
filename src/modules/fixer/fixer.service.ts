import { HttpService } from '@nestjs/axios';
import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as FixerData from './mocker/fixer.response.json';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable({})
export class FixerService {
  private readonly logger = new Logger(FixerService.name);

  constructor(private readonly httpService: HttpService) {}

  fetch(): Observable<AxiosResponse<unknown[]>> {
    return this.httpService.get('http://localhost:3000/cats');
  }

  fetchMock() {
    return FixerData;
  }

  @Cron(CronExpression.EVERY_HOUR, {
    name: 'updateRedis',
    timeZone: 'Asia/Colombo',
  })
  updateRedis() {
    this.logger.debug('Called every hour');
  }
}
