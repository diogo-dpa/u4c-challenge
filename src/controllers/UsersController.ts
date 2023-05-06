import { Request, ResponseToolkit } from "@hapi/hapi";
import { UserService } from "../services/UserServices";

export class UserController {
	private _userService: UserService;
	constructor(userService: UserService) {
		console.log("passou");
		this._userService = userService;
	}

	async saveUser(request: Request, reply: ResponseToolkit) {
		const {
			fullName,
			birthDate,
			email,
			cellphone,
			isThirdPartyUser,
			documents,
			addressData,
		} = request.payload as any;

		console.log({
			fullName,
			birthDate,
			email,
			cellphone,
			isThirdPartyUser,
			documents,
			addressData,
		});
		const result = await this._userService.saveUser(
			fullName,
			birthDate,
			email,
			cellphone,
			isThirdPartyUser,
			documents,
			addressData
		);
		console.log({ result });

		return reply.response({
			data: { ...result },
		});
	}
}
