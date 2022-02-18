import { HttpStatus, Injectable } from "@nestjs/common";
import session, { SessionData } from "express-session";
import { APIHandleException } from "src/error/error.exception";
import { CreateUserDTO } from "./dto/create-user.dto";
import { CreateUserResponseDTO } from "./dto/created-user.dto";
import { SigninDTO } from "./dto/signin-user.dto";
import { SessionResponseDTO } from "./dto/user-session.dto";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import { Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class UserAuthService {

    constructor(
        private readonly userRepository: UserRepository,

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {}

    async createUser(createUserDto: CreateUserDTO) {        
        if(await this.userRepository.findOneByUserId(createUserDto.id)) {
            throw new APIHandleException({
                error: 'USER_AUTHENTICATION_ERROR',
                message: ['유저가 이미 가입되어있습니다'],
                statusCode: HttpStatus.FORBIDDEN
            });
        }
        else {
            const newUser: User = await this.userRepository.save(
                new User(createUserDto.id, createUserDto.password, createUserDto.username, 10000, [])
            );
            
            return new CreateUserResponseDTO(newUser.userId, newUser.username);
        }
    }

    async signin(signinDto: SigninDTO, sessionId: string) {
        const user = await this.userRepository.findOneByUserId(signinDto.id);

        if(!user) { 
            throw new APIHandleException({
                error: 'USER_AUTHENTICATION_ERROR',
                message: ['가입된 유저가 아닙니다.'],
                statusCode: HttpStatus.UNAUTHORIZED
            });
        }
        else {
            if(user.userId === signinDto.id && user.password === signinDto.password) {
                 // TODO: Redis 붙여서 세션 저장
                const str = await this.cacheManager.set(sessionId, user.userId);
                console.log(str);
                return new SessionResponseDTO(sessionId, user.userId);
            }
            else {
                throw new APIHandleException({
                    error: 'USER_AUTHENTICATION_ERROR',
                    message: ['아이디와 비밀번호를 다시 확인해주세요.'],
                    statusCode: HttpStatus.UNAUTHORIZED
                });
            }
        }
    }

}