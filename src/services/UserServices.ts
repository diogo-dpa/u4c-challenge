import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
	private _userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this._userRepository = userRepository;
	}

	async saveUser(userName: string): Promise<User> {
		const result = await this._userRepository.saveUser(
			userName,
			"haha",
			"ultimo",
			true
		);
		return result;
	}
}
