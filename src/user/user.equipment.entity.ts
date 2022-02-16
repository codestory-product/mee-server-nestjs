import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserEquipment {

    @PrimaryGeneratedColumn()
    id: number;    

    @Column({
        type: 'text',
        name: 'equipment_item_hair'
    })
    equipmentHair: string;

    @Column({
        type: 'text',
        name: 'equipment_item_body'
    })
    equipmentBody: string;


}