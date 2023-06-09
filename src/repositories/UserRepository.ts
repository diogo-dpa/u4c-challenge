import { User } from "../config/entities/User";
import { IUserRepository } from "../irepositories/IUserRepository";
import { DataSource, Repository } from "typeorm";
import { AddressData, UserDataUpdate } from "../utils/interfaces";
import { USER_NOT_FOUND_ERROR_MESSAGE } from "../utils/consts";

export class UserRepository implements IUserRepository {
	private _dbConnection: Repository<User>;

	constructor(dbConnection: DataSource) {
		this._dbConnection = dbConnection.getRepository(User);
	}
	public async getUser(id: number): Promise<User> {
		const usersFound = await this._dbConnection.find({
			where: {
				id,
			},
			relations: {
				document: true,
				addresses: true,
			},
		});

		return usersFound.pop();
	}

	public async deleteUser(id: number): Promise<void> {
		const userFound = await this._dbConnection.findOneBy({
			id,
		});

		if (!userFound) throw new Error(USER_NOT_FOUND_ERROR_MESSAGE);

		await this._dbConnection.remove(userFound);
	}

	async saveUser(
		fullName: string,
		birthDate: string,
		email: string,
		cellphone: string,
		isThirdPartyUser: boolean,
		address: AddressData,
		document: number
	): Promise<User> {
		const formattedUser = {
			fullName,
			birthDate,
			email,
			isThirdPartyUser,
			cellphone,
			addresses: [address],
			document,
		} as any;

		return await this._dbConnection.save(formattedUser);
	}

	public async updateUser(
		id: number,
		newUserData: UserDataUpdate
	): Promise<User> {
		const { email, isThirdPartyUser, cellphone, addresses } = newUserData;

		const usersFound = await this._dbConnection.find({
			where: {
				id,
			},
			relations: {
				document: true,
				addresses: true,
			},
		});

		if (!usersFound) throw new Error(USER_NOT_FOUND_ERROR_MESSAGE);
		const userFound = usersFound.pop();

		return await this._dbConnection.save({
			...userFound,
			email: email ?? userFound.email,
			isThirdPartyUser: isThirdPartyUser ?? userFound.isThirdPartyUser,
			cellphone: cellphone ?? userFound.cellphone,
			addresses: addresses ? [...addresses] : userFound.addresses,
		});
	}
}
