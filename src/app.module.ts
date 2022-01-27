import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppLoggerMiddleware } from './applogger.middleware';
import configuration from './config/configuration';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

console.log(process.env.DATABASE_HOST);

@Module({
  imports: [
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
        entities: [User],
        synchronize: true
      })
    }),

    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AppLoggerMiddleware)
        .forRoutes('*')
  }

}
