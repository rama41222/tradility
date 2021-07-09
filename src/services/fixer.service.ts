import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import Data from './mocker/fixer.response.json';

@Injectable({})
export class FixerService {
  constructor(private httpService: HttpService) {}

  fetch(): Observable<AxiosResponse<unknown[]>> {
    return this.httpService.get('http://localhost:3000/cats');
  }

  fetchMock() {
    return Data;
  }
}
