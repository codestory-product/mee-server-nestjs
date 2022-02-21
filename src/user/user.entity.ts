import { Column, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserEquipment } from "./user.equipment.entity";
import { UserItem } from "./user.item.entity";
import { UserScore } from "./user.score.entity";

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

    @Column({
        type: 'text',
        name: 'equipmentBody'
    })
    equipmentBody: string;

    @Column({
        type: 'text',
        name: 'equipmentHair'
    })
    equipmentHair: string;

    @OneToMany((type) => UserItem, (userItem) => userItem.user)
    userItems: UserItem[];

    @OneToMany((type) => UserScore, (userScore) => userScore.user)
    userScores: UserScore[];

    constructor(userId: string, password: string, username: string, money: number, userItems: UserItem[]) {
        this.userId = userId;
        this.password = password;
        this.username = username;
        this.money = money;
        this.userItems = userItems;
        this.equipmentBody = "item0";
        this.equipmentHair = "item10";
    }
    
}