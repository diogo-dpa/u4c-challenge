import {
	Entity,
	Column,
	ManyToMany,
	JoinColumn,
	OneToMany,
	OneToOne,
	JoinTable,
	Unique,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Address } from "./Address";
import { Vehicle } from "./Vehicle";
import { Document } from "./Document";
import { Event } from "./Event";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
	@Column()
	fullName: string;

	@Column()
	birthDate: Date;

	@Column()
	email: string;

	@Column()
	isThirdPartyUser: boolean;

	@Column()
	cellphone: string;

	@ManyToMany(() => Address, (address) => address.users, {
		cascade: true,
        eager: true,
    })
	@JoinTable()
	addresses: Address[];

	@OneToMany(() => Vehicle, (vehicle) => vehicle.owner)
	vehicle: Vehicle[];

	@OneToOne(() => Document)
	@JoinColumn()
	document: Document;

	@ManyToMany(() => Event, (event) => event.client)
	clientEvents: Event[]

	@ManyToMany(() => Event, (event) => event.thirdPartyUser)
	thirdPartyUserEvents: Event[]
}
