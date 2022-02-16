import { CACHE_MANAGER, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { APIHandleException } from "src/error/error.exception";
import { UserInventory } from "./dto/user-inventory.dto";
import { UserItem } from "./user.item.entity";
import { UserRepository } from "./user.repository";
import { Cache } from "cache-manager";
import { User } from "./user.entity";
import { UserItemRepository } from "./user.item.repository";
import { UserInformation } from "./dto/user-information.dto";
import { UserEquipItemDto } from "./dto/user-equip-iterm.dto";
import { UserEquipment } from "./user.equipment.entity";
import { UserEquipmentRepository } from "./user.equip.repository";

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly userItemRepository: UserItemRepository,
        private readonly userEquipmentRepository: UserEquipmentRepository, 

        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) {}

    async getUser(username: string) {
        const user = await this.userRepository.findOneByUserId(username);

        if(!user) {
            throw new APIHandleException({
                error: 'USER_AUTHENTICATION_ERROR',
                message: ['가입된 유저가 아닙니다.'],
                statusCode: HttpStatus.UNAUTHORIZED
            });
        }
        
        return user;
    }

    // 장비 착용
    async equipment(userEquipmentDto: UserEquipItemDto) {
        const user = await this.getUser(userEquipmentDto.username);
        user.equipmentBody = userEquipmentDto.itemBody;
        user.equipmentHair = userEquipmentDto.itemHair;
        
        await this.userRepository.save(user);
    }

    async getUserInfo(username: string) {
        const user = await this.getUser(username);

        return new UserInformation(user.userItems, user.money, user.equipmentBody, user.equipmentHair);
    }

    async getUserItems(username: string, itemType: string) {
        const user = await this.getUser(username);
        console.log(user);

        return new UserInventory(user.userItems);
    }

    async getUserMoney(username: string) {
        const user = await this.getUser(username);

        return user.money;
    }

    async save(user: User) {
        this.userRepository.save(user);
    }

    async saveUserItem(userItem: UserItem) {
        this.userItemRepository.save(userItem);
    }

}