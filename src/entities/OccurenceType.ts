import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class OccurenceType extends BaseEntity {
	@Column()
	type: string;
}
