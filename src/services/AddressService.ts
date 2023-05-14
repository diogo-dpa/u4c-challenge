import { Address } from "../config/entities/Address";
import { IAddressService } from "../iservices/IAddressService";
import { AddressRepository } from "../repositories/AddressRepository";

export class AddressService implements IAddressService {
	private _addressRepository: AddressRepository;

	constructor(AddressRepository: AddressRepository) {
		this._addressRepository = AddressRepository;
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
		const result = await this._addressRepository.saveAddress(
			zipcode,
			street,
			number,
			state,
			country,
			neighborhood,
			complement
		);
		return result;
	}
}
