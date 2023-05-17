import { User } from "../config/entities/User";
import { AddressData, UserDataUpdate } from "../utils/interfaces";

export abstract class IUserRepository {
	public abstract getUser(id: number): Promise<User>;
	public abstract deleteUser(id: number): Promise<void>;
	public abstract saveUser(
		fullName: string,
		birthDate: string,
		email: string,
		cellphone: string,
		isThirdPartyUser: boolean,
		address: AddressData,
		document: number
	): Promise<User>;

	public abstract updateUser(
		id: number,
		newUserData: UserDataUpdate
	): Promise<User>;
}
