import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserAuthService } from "./user.auth.service";

@Controller('user/authentication')
export class UserAuthenticationController {

    constructor(private readonly userAuthService: UserAuthService) {}

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDTO) {
        return await this.userAuthService.createUser(createUserDto);
    }

}