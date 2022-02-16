import { IsString } from "class-validator";

export class UserEquipItemDto {
    
    @IsString()
    readonly itemHair?: string;
    @IsString()
    readonly itemBody?: string;
    @IsString()
    readonly username?: string;

}