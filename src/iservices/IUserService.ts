import { User } from "../entities/User";

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
		isThirdPartyUser: boolean,
		cellphone: string,
		documentData: DocumentData,
		addressData: AddressData
	): Promise<User>;
}
