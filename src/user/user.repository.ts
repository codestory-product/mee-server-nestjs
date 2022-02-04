import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async findOneByUserId(userId: string) {
        const user = await this.findOne({ userId: userId }, {relations: ["userItems"]});

        if(!user) {
            return undefined;
        }
        
        return user;
    }

}