import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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

    constructor(userId: string, password: string, username: string) {
        this.userId = userId;
        this.password = password;
        this.username = username;
    }
    
}