import { EntityRepository, Repository } from "typeorm";
import { UserItem } from "./user.item.entity";

@EntityRepository(UserItem)
export class UserItemRepository extends Repository<UserItem> {
}