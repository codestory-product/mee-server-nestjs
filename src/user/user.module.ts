import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthService } from './user.auth.service';
import { UserAuthenticationController } from './user.controller';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CacheModule } from '@nestjs/common';
import * as redisStore from "cache-manager-redis-store";
import { UserService } from './user.service';
import { UserController } from './user.buisness.controller';
import { UserItem } from './user.item.entity';
import { UserItemRepository } from './user.item.repository';
import { UserEquipment } from './user.equipment.entity';
import { UserEquipmentRepository } from './user.equip.repository';
import { UserScore } from './user.score.entity';
import { UserScoreRepository } from './user.score.repository';
// nest g mo user

@Module({
    imports: [
        CacheModule.register({
            store: redisStore,
            host: '127.0.0.1',
            port: 6379
          }),
        TypeOrmModule.forFeature([User, UserRepository, UserItem, UserItemRepository, UserEquipment, UserEquipmentRepository, UserScore, UserScoreRepository])
    ],
    controllers: [UserAuthenticationController, UserController],
    providers: [UserAuthService, UserService],
    exports: [UserService]
})
export class UserModule {}
