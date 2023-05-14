import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToOne,
	Unique,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Vehicle } from "./Vehicle";
import { OccurenceType } from "./OccurenceType";
import { Address } from "./Address";

@Entity()
export class Event extends BaseEntity {
	@ManyToMany(() => User, (client) => client.clientEvents, {
		cascade: true,
        eager: true,
    })
	@JoinTable()
	client: User[];

	@ManyToMany(() => User, (thirrdPartyUser) => thirrdPartyUser.thirdPartyUserEvents, {
		cascade: true,
        eager: true,
    })
	@JoinTable()
	thirdPartyUser: User[];

	@ManyToMany(() => Vehicle, (vehicle) => vehicle.vehicleEvents, {
		cascade: true,
        eager: true,
    })
	@JoinTable()
	vehicles: Vehicle[];

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
