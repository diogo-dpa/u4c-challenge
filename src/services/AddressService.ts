import { Address } from "../config/entities/Address";
import { IAddressService } from "../iservices/IAddressService";
import { AddressRepository } from "../repositories/AddressRepository";

export class AddressService implements IAddressService {
	private _addressRepository: AddressRepository;

	constructor(AddressRepository: AddressRepository) {
		this._addressRepository = AddressRepository;
	}
	public async getAddress(id: number): Promise<Address> {
		return await this._addressRepository.getAddress(id);
	}
	public async deleteAddress(id: number): Promise<void> {
		await this._addressRepository.deleteAddress(id);
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
