import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';

/**
 * ArgsType to the query to convert
 */
@InputType()
export class ConvertInput {
  @Field(() => String)
  from: string;

  @Field(() => String)
  to: string;
}
