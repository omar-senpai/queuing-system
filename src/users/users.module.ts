import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      // Store-specific configuration:
      host: 'r-l4vv435ts9cnfirj3n.redis.me-central-1.rds.aliyuncs.com',
      port: 6379,
      username: 'r-l4vv435ts9cnfirj3n',
      password: 'Q2xvdWQgU2xlZXBlcnM='
    }),],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
