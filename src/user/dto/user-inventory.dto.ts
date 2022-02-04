import { UserItem } from "../user.item.entity"

export class UserInventory {

    readonly userItems: UserItem[];

    constructor(userItems: UserItem[]) {
        this.userItems = userItems;
    }

}