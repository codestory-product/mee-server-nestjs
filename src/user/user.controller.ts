import { Body, CACHE_MANAGER, Controller, Get, Inject, Param, Post, Query, Req } from "@nestjs/common";
import { Request } from "express";
import { CreateUserDTO } from "./dto/create-user.dto";
import { SigninDTO } from "./dto/signin-user.dto";
import { UserAuthService } from "./user.auth.service";
import { Cache } from "cache-manager";
import { UserService } from "./user.service";

@Controller('user/authentication')
export class UserAuthenticationController {

    constructor(
        private readonly userAuthService: UserAuthService,
        private readonly userService : UserService
    ) {}

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDTO) {
        return await this.userAuthService.createUser(createUserDto);
    }

    @Post('signin')
    async signin(@Req() request: Request, @Body() signinDto: SigninDTO) {
        return await this.userAuthService.signin(signinDto, request.sessionID);
    }

    @Get('items/:username')
    async getUserItems(@Param("username") username: string, @Query("item_types") itemType: string) {
        return await this.userService.getUserItems(username, itemType);
    } 

}