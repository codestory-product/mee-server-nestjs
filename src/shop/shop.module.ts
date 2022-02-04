import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from "cache-manager-redis-store";
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
    imports: [
        CacheModule.register({
            store: redisStore,
            host: '127.0.0.1',
            port: 6379
          }),
        TypeOrmModule.forFeature([]),
        UserModule
    ],
    controllers: [ShopController],
    providers: [ShopService]
})
export class ShopModule {}
