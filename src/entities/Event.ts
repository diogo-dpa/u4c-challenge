import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToOne,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Vehicle } from "./Vehicle";
import { OccurenceType } from "./OccurenceType";
import { Address } from "./Address";

@Entity()
export class Event extends BaseEntity {
	@ManyToMany(() => User)
	@JoinTable()
	client: User[];

	@ManyToMany(() => User)
	@JoinTable()
	thirdPartyUser: User[];

	@ManyToMany(() => Vehicle)
	@JoinTable()
	vehicle: Vehicle[];

	@OneToOne(() => OccurenceType)
	@JoinColumn()
	occurenceType: OccurenceType;

	@ManyToOne(() => Address, (address) => address.event)
	@JoinColumn()
	address: Address;

	@Column()
	eventDate: Date;

	@Column()
	eventCost: number;
}
