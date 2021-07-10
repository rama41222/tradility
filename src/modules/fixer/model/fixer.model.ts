import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { MainCurrency } from '../fixer.types.model';

@ObjectType()
export class Fixer {
  @Field()
  from: MainCurrency;

  @Field()
  to: MainCurrency;

  @Field(() => Float)
  rate: number;

  @Field(() => Int)
  timestamp?: number;

  @Field()
  date: string;
}
