import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TradeModule } from './modules/trade/trade.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FixerService } from './modules/fixer/fixer.service';
import { FixerModule } from './modules/fixer/fixer.module';
import { ConfigModule } from '@nestjs/config';
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
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
