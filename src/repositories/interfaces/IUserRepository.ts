import { User } from "../../entities/User";

export abstract class IUserRepository {
	public abstract saveUser(
		firstName: string,
		midName: string,
		lastName: string,
		isActive: boolean
	): Promise<User>;
}
