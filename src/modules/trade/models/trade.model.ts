import { Field, Int, ObjectType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

/**
 * Represents a trade object which returns the rates
 */
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
