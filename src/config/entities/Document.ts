import { Column, Entity, OneToOne, Unique } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

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

	@OneToOne(() => User, (user) => user.document, { onDelete: "CASCADE" })
	user: User;
}
