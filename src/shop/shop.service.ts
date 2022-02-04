import { HttpStatus, Injectable } from "@nestjs/common";
import { APIHandleException } from "src/error/error.exception";
import { UserItem } from "src/user/user.item.entity";
import { UserService } from "src/user/user.service";
import { ShopBuyRequestDTO, ShopBuyResponseDTO } from "./dto/shop-buy.dto";
import { foundItemPrice } from "./shop.item";

@Injectable()
export class ShopService {

    constructor(private readonly userService: UserService) {}

    async buy(shopBuyRequestDTO: ShopBuyRequestDTO) {
        console.log(shopBuyRequestDTO);
        const user = await this.userService.getUser(shopBuyRequestDTO.userId);
        const itemPrice = foundItemPrice(shopBuyRequestDTO.itemName, shopBuyRequestDTO.itemType);

        if(itemPrice === -1) {
            throw new APIHandleException({
                error: "INVALID_ITEM_ERROR",
                message: ['아이템 정보가 일치하지 않습니다.'],
                statusCode: HttpStatus.BAD_REQUEST
            });
        }

        if(user.money - itemPrice >= 0) {
            user.money -= itemPrice;
            const userItem = new UserItem(shopBuyRequestDTO.itemType, shopBuyRequestDTO.itemName, user);
            await this.userService.saveUserItem(userItem);

            if(user.userItems === undefined) {
                user.userItems = [];
            }
            
            user.userItems.push(userItem);

            await this.userService.save(user);

            return new ShopBuyResponseDTO(user.money);
        }
        else {
            throw new APIHandleException({
                error: "NOT_ENOUGH_USER_MONEY",
                message: ['유저가 소지하고 있는 돈이 부족합니다.'],
                statusCode: HttpStatus.BAD_REQUEST
            });
        }
    }

}