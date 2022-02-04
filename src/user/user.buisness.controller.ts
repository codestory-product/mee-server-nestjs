import { Controller, Get, Param, Query } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {

    constructor(private readonly userService : UserService) 
    {}

    @Get('items/:username')
    async getUserItems(@Param("username") username: string, @Query("item_types") itemType: string) {
        return await this.userService.getUserItems(username, itemType);
    } 

}