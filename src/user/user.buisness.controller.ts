import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { UserEquipItemDto } from "./dto/user-equip-iterm.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {

    constructor(private readonly userService : UserService) 
    {}

    @Get('items/:username')
    async getUserItems(@Param("username") username: string, @Query("item_types") itemType: string) {
        return await this.userService.getUserItems(username, itemType);
    }

    @Get('information/:username')
    async getUserInformation(@Param("username") username: string) {
        return await this.userService.getUserInfo(username);
    }

    @Post("item/equipment")
    async equipment(@Body() equip: UserEquipItemDto) {
        await this.userService.equipment(equip);

        return { 'ok': 200 };
    }

}