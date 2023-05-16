import { Address } from "../config/entities/Address";

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

	public abstract getAddress(id: number): Promise<Address>;

	public abstract deleteAddress(id: number): Promise<void>;
}
