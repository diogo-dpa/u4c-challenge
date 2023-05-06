import { User } from "../entities/User";
import { IUserRepository } from "../irepositories/IUserRepository";
import { DataSource, Repository } from "typeorm";

export class UserRepository implements IUserRepository {
	private _dbConnection: Repository<User>;

	constructor(dbConnection: DataSource) {
		this._dbConnection = dbConnection.getRepository(User);
	}

	async saveUser(
		fullName: string,
		birthDate: string,
		email: string,
		isThirdPartyUser: boolean,
		cellphone: string,
		address: number,
		document: number
	): Promise<User> {
		const userTeste = {
			fullName,
			birthDate: new Date(),
			email,
			isThirdPartyUser,
			cellphone,
			address,
			document,
		} as any;

		console.log({ userTeste });
		const result = await this._dbConnection.save(userTeste);
		return result;
	}
}
