import { User } from "../config/entities/User";
import { AddressData, DocumentData } from "../utils/interfaces";

export abstract class IUserService {
	public abstract getUser(id: number): Promise<User>;
	public abstract deleteUser(id: number): Promise<void>;
	public abstract saveUser(
		fullName: string,
		birthDate: string,
		email: string,
		cellphone: string,
		isThirdPartyUser: boolean,
		documentData: DocumentData,
		addressData: AddressData
	): Promise<User>;
	public abstract updateUser(
		id: number,
		email: string,
		cellphone: string,
		isThirdPartyUser: boolean
	): Promise<User>;
}
