import { EntityRepository, Repository } from "typeorm";
import { UserEquipment } from "./user.equipment.entity";

@EntityRepository(UserEquipment)
export class UserEquipmentRepository extends Repository<UserEquipment> {
}