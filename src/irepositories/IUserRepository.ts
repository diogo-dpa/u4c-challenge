import { User } from "../config/entities/User";
import { AddressData, DocumentData } from "../iservices/IUserService";

export abstract class IUserRepository {
	public abstract saveUser(
		fullName: string,
		birthDate: string,
		email: string,
		cellphone: string,
		isThirdPartyUser: boolean,
		address: AddressData,
		document: number
	): Promise<User>;

	public abstract getUser(
		id: number
	): Promise<User>;

	public abstract updateUser(
		id: number,
		email: string,
		isThirdPartyUser: boolean,
		cellphone: string
	): Promise<User>;

	public abstract deleteUser(
		id: number
	): Promise<void>;
}
