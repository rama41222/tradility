import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TradeModule } from './modules/trade/trade.module';
import { TradeService } from './modules/trade/trade.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    TradeModule,
  ],
  controllers: [],
  providers: [TradeService],
})
export class AppModule {}
