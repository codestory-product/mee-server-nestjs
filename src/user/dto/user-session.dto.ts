
export class SessionResponseDTO {

    readonly session: string;
    readonly userId: string;

    constructor(session: string, userId: string) {
        this.session = session;
        this.userId = userId;
    }

}