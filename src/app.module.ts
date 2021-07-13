import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TradeModule } from './modules/trade/trade.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FixerModule } from './modules/fixer/fixer.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
/**
 * Main App modules
 */
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    TradeModule,
    FixerModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
