import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Event } from "./Event";
import { User } from "./User";

@Entity()
export class Address extends BaseEntity {
	@Column()
	zipcode: string;

	@Column()
	street: string;

	@Column()
	number: number;

	@Column()
	complement: string;

	@Column()
	state: string;

	@Column()
	country: string;

	@Column()
	neighborhood: string;

	@OneToMany(() => Event, (event) => event.address)
	event: Event[];

	@ManyToMany(() => User, (user) => user.addresses)
	users: User[]
}
