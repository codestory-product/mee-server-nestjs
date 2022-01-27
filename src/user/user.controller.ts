import { Body, Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { CreateUserDTO } from "./dto/create-user.dto";
import { SigninDTO } from "./dto/signin-user.dto";
import { UserAuthService } from "./user.auth.service";

@Controller('user/authentication')
export class UserAuthenticationController {

    constructor(private readonly userAuthService: UserAuthService) {}

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDTO) {
        return await this.userAuthService.createUser(createUserDto);
    }

    @Post('signin')
    async signin(@Req() request: Request, @Body() signinDto: SigninDTO) {
        return await this.userAuthService.signin(signinDto, request.sessionID);
    }

}