import { IsNumber, IsString, Length } from "class-validator";

export class CreateUserDTO {

    @IsString()
    @Length(8, 30)
    readonly id?: string;

    @IsString()
    @Length(6, 20)
    readonly username?: string;

    @IsString()
    @Length(8, 30)
    readonly password?: string;

}