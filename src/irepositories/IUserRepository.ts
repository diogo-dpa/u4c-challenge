import { User } from "../entities/User";

export abstract class IUserRepository {
	public abstract saveUser(
		fullName: string,
		birthDate: string,
		email: string,
		isThirdPartyUser: boolean,
		cellphone: string,
		address: number,
		document: number
	): Promise<User>;
}
