import { Field, Int, ObjectType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@ObjectType()
export class Trade {
  @Field()
  base: string;

  @Field()
  date: string;

  @Field(() => Int)
  timestamp?: number;

  @Field(() => JSON)
  rates: any;
}
