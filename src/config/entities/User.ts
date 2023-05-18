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
	@Column("text", { nullable: false })
	fullName: string;

	@Column("date", { nullable: false })
	birthDate: Date;

	@Column("text", { nullable: false })
	email: string;

	@Column("bool", { nullable: false })
	isThirdPartyUser: boolean;

	@Column("text", { nullable: false })
	cellphone: string;

	@ManyToMany(() => Address, (address) => address.users, {
		cascade: true,
		eager: true,
		onDelete: "CASCADE",
	})
	@JoinTable()
	addresses: Address[];

	@OneToMany(() => Vehicle, (vehicle) => vehicle.owner, { onDelete: "CASCADE" })
	vehicle: Vehicle[];

	@OneToOne(() => Document, { eager: true, onDelete: "CASCADE" })
	@JoinColumn()
	document: Document;

	@ManyToMany(() => Event, (event) => event.client)
	clientEvents: Event[];

	@ManyToMany(() => Event, (event) => event.thirdPartyUser)
	thirdPartyUserEvents: Event[];
}
