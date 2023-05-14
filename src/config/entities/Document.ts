import { Column, Entity, Unique } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
@Unique(["rg", "cpf", "cnh", "passport"])
export class Document extends BaseEntity {
	@Column()
	rg: string;

	@Column()
	cpf: string;

	@Column()
	cnh: string;

	@Column()
	passport: string;
}
