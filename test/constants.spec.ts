import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import RESPONSES from '../src/constants';

describe('Constants Test', () => {
  it('Key check', () => {
    expect(RESPONSES).toHaveProperty('ERRORS');
    expect(RESPONSES).toHaveProperty('SUCCESS');
  });
});
