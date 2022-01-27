import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthService } from './user.auth.service';
import { UserAuthenticationController } from './user.controller';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

// nest g mo user

@Module({
    imports: [TypeOrmModule.forFeature([User, UserRepository])],
    controllers: [UserAuthenticationController],
    providers: [UserAuthService]
})
export class UserModule {}
