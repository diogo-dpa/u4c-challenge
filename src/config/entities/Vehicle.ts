import {
	Column,
	JoinColumn,
	ManyToOne,
	Entity,
	ManyToMany,
	Unique,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Event } from "./Event";

@Entity()
@Unique(["chassis", "plate"])
export class Vehicle extends BaseEntity {
	@Column("text", { nullable: false })
	brand: string;

	@Column("text", { nullable: false })
	model: string;

	@Column("integer", { nullable: false })
	fabricationYear: number;

	@Column("integer", { nullable: false })
	modelYear: number;

	@Column("text", { nullable: false })
	chassis: string;

	@Column("text", { nullable: false })
	plate: string;

	@Column("integer", { nullable: false })
	mileage: number;

	@ManyToOne(() => User, (user) => user.vehicle)
	@JoinColumn()
	owner: User;

	@ManyToMany(() => Event, (event) => event.vehicles)
	vehicleEvents: Event[];
}
