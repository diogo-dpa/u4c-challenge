import { Address } from "../entities/Address";

export abstract class IAddressService {
	public abstract saveAddress(
		zipcode: string,
		street: string,
		number: number,
		state: string,
		country: string,
		neighborhood: string,
		complement?: string
	): Promise<Address>;
}
