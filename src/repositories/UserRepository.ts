import { User } from "../entities/User";
import { IUserRepository } from "./interfaces/IUserRepository";
import { DataSource, Repository } from "typeorm";

export class UserRepository implements IUserRepository {
	private _dbConnection: Repository<User>;

	constructor(dbConnection: DataSource) {
		this._dbConnection = dbConnection.getRepository(User);
	}

	async saveUser(
		firstName: string,
		midName: string,
		lastName: string,
		isActive: boolean
	): Promise<User> {
		const userTeste = {
			firstName,
			lastName,
			midName,
			isActive,
		} as User;
		const result = await this._dbConnection.save(userTeste);
		return result;
	}
}
