import { User } from "../config/entities/User";

export interface DocumentData {
	rg: string;
	cpf: string;
	cnh: string;
}

export interface AddressData {
	zipcode: string;
	street: string;
	number: number;
	complement?: string;
	state: string;
	country: string;
	neighborhood: string;
}

export abstract class IUserService {
	public abstract saveUser(
		fullName: string,
		birthDate: string,
		email: string,
		cellphone: string,
		isThirdPartyUser: boolean,
		documentData: DocumentData,
		addressData: AddressData
	): Promise<User>;

	public abstract getUser(
		id: number
	): Promise<User>;

	public abstract updateUser(
		id: number,
		email: string,
		cellphone: string,
		isThirdPartyUser: boolean,
	): Promise<User>;

	public abstract deleteUser(
		id: number
	): Promise<void>;
}
