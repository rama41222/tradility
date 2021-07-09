import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TradeModule } from './modules/trade/trade.module';
import { TradeService } from './modules/trade/trade.service';
import { FixerService } from './services/fixer.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    TradeModule,
    HttpModule,
  ],
  controllers: [],
  providers: [TradeService, FixerService],
})
export class AppModule {}
