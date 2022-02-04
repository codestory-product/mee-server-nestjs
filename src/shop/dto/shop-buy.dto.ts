import { IsString } from "class-validator";

class ShopBuyResponseDTO {
    readonly money: number

    constructor(money: number) {
        this.money = money;
    }
}

class ShopBuyRequestDTO {
    @IsString()
    readonly userId?: string;

    @IsString()
    readonly itemType?: string;

    @IsString()
    readonly itemName?: string;

    constructor(userId: string, itemType: string, itemName: string) {
        this.userId = userId;
        this.itemType = itemType;
        this.itemName = itemName;
    }
}

export { ShopBuyResponseDTO, ShopBuyRequestDTO }