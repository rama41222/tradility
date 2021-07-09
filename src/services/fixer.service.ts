import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import Data from './mocker/fixer.response.json';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable({})
export class FixerService {
  private readonly logger = new Logger(FixerService.name);

  constructor(private httpService: HttpService) {}

  fetch(): Observable<AxiosResponse<unknown[]>> {
    return this.httpService.get('http://localhost:3000/cats');
  }

  fetchMock() {
    return Data;
  }

  @Cron(CronExpression.EVERY_HOUR, {
    name: 'updateRedis',
    timeZone: 'Asia/Colombo',
  })
  updateRedis() {
    this.logger.debug('Called every hour');
  }
}
