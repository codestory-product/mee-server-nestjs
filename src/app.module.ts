import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AllowRequestConfiguration } from './security/allow.security';
import { SecurityMiddleware } from './security/security.middleware';
import { CacheModule } from '@nestjs/common';
import { ShopModule } from './shop/shop.module';
import * as redisStore from "cache-manager-redis-store";
import { UserItem } from './user/user.item.entity';
import { UserEquipment } from './user/user.equipment.entity';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration]
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host:  configService.get('database.host'),
        port: configService.get('database.port'),
        username:  configService.get('database.user'),
        database:  configService.get('database.name'),
        password:  configService.get('database.password'),
        entities: [User, UserItem, UserEquipment],
        synchronize: true
      })
    }),

    UserModule,

    ShopModule
  ],
  controllers: [AppController],
  providers: [AppService, AllowRequestConfiguration],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(SecurityMiddleware)
        .forRoutes('*')
  }

}
