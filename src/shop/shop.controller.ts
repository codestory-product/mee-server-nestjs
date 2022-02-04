import { Body, Controller, Post } from "@nestjs/common";
import { ShopService } from "./shop.service";
import { ShopBuyRequestDTO } from "./dto/shop-buy.dto";

@Controller("shop")
export class ShopController {

    constructor(private readonly shopService: ShopService) {}

    @Post('buy')
    async buy(@Body() shopBuyRequestDTO: ShopBuyRequestDTO) {
        return await this.shopService.buy(shopBuyRequestDTO);
    }

}