import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserItem {

    @PrimaryGeneratedColumn()
    id: number;    

    @Column({
        type: 'text',
        name: 'item_type'
    })
    itemType: string;

    @Column({
        type: 'text',
        name: 'item_name'
    })
    itemName: string;

    @ManyToOne((type) => User, (user) => user.userItems)
    @JoinTable()
    user: User;

    constructor(itemType: string, itemName: string, user: User) {
        this.itemType = itemType;
        this.itemName = itemName;
        this.user = user;
    }

}