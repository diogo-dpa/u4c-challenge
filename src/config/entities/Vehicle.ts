import { Column, JoinColumn, ManyToOne, Entity, ManyToMany, Unique } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Event } from "./Event";

@Entity()
@Unique(["chassis", "plate"])
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

	@ManyToMany(() => Event, (event) => event.vehicles)
	vehicleEvents: Event[]
}
