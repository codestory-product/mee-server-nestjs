import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserItem } from "./user.item.entity";

@Entity()
export class User { 

    @Column({
        type: 'text',
        name: 'userId'
    })
    @PrimaryColumn()
    userId: string;

    @Column({
        type: 'text',
        name: 'password'
    })
    password: string;

    @Column({
        type: 'text',
        name: 'username'
    })
    username: string;

    @Column({
        type: 'int',
        name: 'money'
    })
    money: number;

    @OneToMany((type) => UserItem, (userItem) => userItem.user)
    userItems: UserItem[];

    constructor(userId: string, password: string, username: string, money: number, userItems: UserItem[]) {
        this.userId = userId;
        this.password = password;
        this.username = username;
        this.money = money;
        this.userItems = userItems;
    }
    
}