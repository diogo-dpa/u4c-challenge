import { Column, Entity, Unique } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
@Unique(["type"])
export class OccurenceType extends BaseEntity {
	@Column("text", { nullable: false })
	type: string;
}
