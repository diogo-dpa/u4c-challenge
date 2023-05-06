import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
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
