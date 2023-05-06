import { Column, JoinColumn, ManyToOne, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Event } from "./Event";

@Entity()
export class Vehicle extends BaseEntity {
	@Column()
	brand: string;

	@Column()
	model: string;

	@Column()
	fabricationYear: number;

	@Column()
	modelYear: number;

	@Column()
	chassis: string;

	@Column()
	plate: string;

	@Column()
	mileage: number;

	@ManyToOne(() => User, (user) => user.vehicle)
	@JoinColumn()
	owner: User;

	@ManyToOne(() => Event, (event) => event.vehicle)
	@JoinColumn()
	event: Event;
}
