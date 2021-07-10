import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ConvertInput {
  @Field(() => String)
  from: string;

  @Field(() => String)
  to: string;
}
