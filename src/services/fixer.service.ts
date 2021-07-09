import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import Data from './mocker/fixer.response.json';
import { Cron } from '@nestjs/schedule';
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

  @Cron('*/5 * * * * *')
  updateRedis() {
    this.logger.debug('Called when the current second is 5');
  }
}
