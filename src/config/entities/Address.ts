import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Event } from "./Event";
import { User } from "./User";

@Entity()
export class Address extends BaseEntity {
	@Column("text", { nullable: false })
	zipcode: string;

	@Column("text", { nullable: false })
	street: string;

	@Column("integer", { nullable: false })
	number: number;

	@Column("text", { nullable: true })
	complement: string;

	@Column("text", { nullable: false })
	state: string;

	@Column("text", { nullable: false })
	country: string;

	@Column("text", { nullable: false })
	neighborhood: string;

	@OneToMany(() => Event, (event) => event.address)
	event: Event[];

	@ManyToMany(() => User, (user) => user.addresses, { onDelete: "CASCADE" })
	users: User[];
}
