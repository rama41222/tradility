import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { converter } from '../src/modules/fixer/fixer.utils';

describe('Conversion util Test', () => {
  it('Convertion from one value to next', () => {
    converter(1, 1);
    expect(converter(1, 1)).toEqual(1);
    expect(converter(0, 1)).toEqual(0);
    expect(converter(1, 0)).toEqual(Infinity);
  });
});
