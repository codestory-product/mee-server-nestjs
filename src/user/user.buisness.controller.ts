import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { UserEquipItemDto } from "./dto/user-equip-iterm.dto";
import { UserMinigameGameDTO } from "./dto/user-finished-game.dto";
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

    @Post('game')
    async calcUserScore(@Body() userMiniGameData: UserMinigameGameDTO) {
        await this.userService.saveUserMinigameData(userMiniGameData);
    }

    @Get('game/score/:username')
    async getUserScore(@Param('username') userId: string) {
        return await this.userService.getUserScores(userId);
    }

    @Get('game/ranking')
    async getRankings(@Query("amountOfViewData") amountOfViewData: number) {
        return await this.userService.getRankings(amountOfViewData);
    }

    @Post("item/equipment")
    async equipment(@Body() equip: UserEquipItemDto) {
        await this.userService.equipment(equip);

        return { 'ok': 200 };
    }

}