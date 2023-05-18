import { Column, Entity, OneToOne, Unique } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity()
@Unique(["rg", "cpf", "cnh", "passport"])
export class Document extends BaseEntity {
	@Column("text", { nullable: false })
	rg: string;

	@Column("text", { nullable: false })
	cpf: string;

	@Column("text", { nullable: false })
	cnh: string;

	@Column("text", { nullable: true })
	passport: string;

	@OneToOne(() => User, (user) => user.document, { onDelete: "CASCADE" })
	user: User;
}
