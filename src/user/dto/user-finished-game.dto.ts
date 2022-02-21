import { IsNumber, IsString } from "class-validator";

export class UserMinigameGameDTO {

    @IsString()
    readonly userId: string;
    @IsNumber()
    readonly score: number;
    @IsNumber()
    readonly money: number;

    constructor(userId: string, score: number, money: number) {
        this.userId = userId;
        this.score = score;
        this.money = money;
    }

}