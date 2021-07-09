import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class TradeResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
