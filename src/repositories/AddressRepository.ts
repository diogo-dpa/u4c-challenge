import { Address } from "../config/entities/Address";
import { IAddressRepository } from "../irepositories/IAddressRepository";
import { DataSource, Repository } from "typeorm";
import { ADDRESS_NOT_FOUND_ERROR_MESSAGE } from "../utils/consts";

export class AddressRepository implements IAddressRepository {
	private _dbConnection: Repository<Address>;

	constructor(dbConnection: DataSource) {
		this._dbConnection = dbConnection.getRepository(Address);
	}
	public async getAddress(id: number): Promise<Address> {
		const addressFound = await this._dbConnection.findOneBy({ id });

		if (!addressFound) throw Error(ADDRESS_NOT_FOUND_ERROR_MESSAGE);

		return addressFound;
	}

	public async deleteAddress(id: number): Promise<void> {
		const addressFound = await this._dbConnection.findOneBy({
			id,
		});

		if (!addressFound) throw new Error(ADDRESS_NOT_FOUND_ERROR_MESSAGE);

		await this._dbConnection.remove(addressFound);
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
		return await this._dbConnection.save(AddressTeste);
	}
}
