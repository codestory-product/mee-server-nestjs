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
import { UserScoreRepository } from "./user.score.repository";
import { UserMinigameGameDTO } from "./dto/user-finished-game.dto";
import { UserScore } from "./user.score.entity";

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly userItemRepository: UserItemRepository,
        private readonly userEquipmentRepository: UserEquipmentRepository,
        private readonly userScoreRepository: UserScoreRepository,

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

    async saveUserMinigameData(userMiniGameData: UserMinigameGameDTO) {
        const user = await this.getUser(userMiniGameData.userId);

        if(user.userScores === undefined) {
            user.userScores = [];
        }

        user.money += userMiniGameData.money;
        let newUserScoreEntity = new UserScore(userMiniGameData.score, user);

        if(user.userScores.length >= 5) {
            const sorted: UserScore[] = user.userScores.sort(function(a, b) { return b.score - a.score });

            // 매우 간단한 그리디 알고리즘
            for(let i = 0; i < sorted.length; i++) {
                // 기존에 있던 스코어가 새로 들어온 스코어보다 작다면 세대교체
                if(sorted[i].score < newUserScoreEntity.score) {
                    newUserScoreEntity = await this.userScoreRepository.save(newUserScoreEntity);
                    sorted[i] = newUserScoreEntity;
                    break;
                }
            }
        }
        else {
            await this.userScoreRepository.save(newUserScoreEntity);
            user.userScores.push(newUserScoreEntity);
        }

        await this.userRepository.save(user);
    }

    async getRankings(amountOfViewData: number) {
        return await this.userRepository
                            .createQueryBuilder('user')
                            .leftJoinAndSelect('user.userScores', 's', 's.userUserId = user.userId')
                            .select('user.userId, s.score')
                            .orderBy('s.score', 'DESC')
                            .offset(0)
                            .limit(amountOfViewData)
                            .getRawMany();
                            
    }
    
    async getUserScores(userId: string) {
        const user = await this.getUser(userId);
        console.log(user);

        return user.userScores;
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