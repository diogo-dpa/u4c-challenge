import { Address } from "../config/entities/Address";
import { IAddressRepository } from "../irepositories/IAddressRepository";
import { DataSource, Repository } from "typeorm";

export class AddressRepository implements IAddressRepository {
	private _dbConnection: Repository<Address>;

	constructor(dbConnection: DataSource) {
		this._dbConnection = dbConnection.getRepository(Address);
	}
	public getAddress(id: number): Promise<Address> {
		throw new Error("Method not implemented.");
	}
	public updateAddress(id: number, zipcode?: string, street?: string, number?: number, state?: string, country?: string, neighborhood?: string, complement?: string): Promise<Address> {
		throw new Error("Method not implemented.");
	}
	public deleteAddress(id: number): Promise<Address> {
		throw new Error("Method not implemented.");
	}

	async saveAddress(
		zipcode: string,
		street: string,
		number: number,
		state: string,
		country: string,
		neighborhood: string,
		complement?: string
	): Promise<Address> {
		const AddressTeste = {
			zipcode,
			street,
			number,
			state,
			country,
			neighborhood,
			complement,
		} as any;
		const result = await this._dbConnection.save(AddressTeste);
		return result;
	}
}
