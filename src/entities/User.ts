import {
	Entity,
	Column,
	ManyToMany,
	JoinColumn,
	OneToMany,
	OneToOne,
	JoinTable,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Address } from "./Address";
import { Vehicle } from "./Vehicle";
import { Document } from "./Document";

@Entity()
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

	@ManyToMany(() => Address)
	@JoinTable()
	address: Address[];

	@OneToMany(() => Vehicle, (vehicle) => vehicle.owner)
	vehicle: Vehicle[];

	@OneToOne(() => Document)
	@JoinColumn()
	document: Document;
}
