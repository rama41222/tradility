
import { Module, CacheModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TradeModule } from './modules/trade/trade.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FixerModule } from './modules/fixer/fixer.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import * as redisStore from 'cache-manager-redis-store';

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
      isGlobal: true,
      cache: true,
    }),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
