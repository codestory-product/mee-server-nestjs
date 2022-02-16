import { UserEquipment } from "../user.equipment.entity";
import { UserItem } from "../user.item.entity";

export class UserInformation {

    readonly inventory: UserItem[];
    readonly money: number;
    readonly equipmentBody: string;
    readonly equipmentHair: string;

    constructor (inventory: UserItem[], money: number, body: string, hair: string) {
        this.inventory = inventory;
        this.money = money;
        this.equipmentBody = body;
        this.equipmentHair = hair;
    }

}