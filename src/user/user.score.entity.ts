import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserScore {

    @PrimaryGeneratedColumn()
    id: number;    

    @Column({
        type: 'int',
        name: 'score'
    })
    score: number;

    @ManyToOne((type) => User, (user) => user.userScores)
    @JoinTable()
    user: User;

    constructor(score: number, user: User) {
        this.user = user;
        this.score = score;
    }

}