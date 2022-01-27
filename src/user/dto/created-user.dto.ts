export class CreateUserResponseDTO {

    readonly id: string;
    readonly username: string;

    constructor(id: string, username: string) {
        this.id = id;
        this.username = username;
    }

}