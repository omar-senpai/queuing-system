import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      // Store-specific configuration:
      host: 'r-l4vv435ts9cnfirj3n.redis.me-central-1.rds.aliyuncs.com',
      port: 6379,
      username: 'r-l4vv435ts9cnfirj3n',
      password: 'Q2xvdWQgU2xlZXBlcnM='
    }),
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST, //"host.docker.internal",
      port: parseInt(process.env.DB_PORT), //5432
      username: process.env.DB_USERNAME, //"postgres",
      password: process.env.DB_PASSWORD, //"root",
      database: process.env.DB_NAME,//"queuing-system",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    QueueModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
