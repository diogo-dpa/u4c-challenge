import { Request, ResponseToolkit } from "@hapi/hapi";
import { UserService } from "../services/UserServices";

export class UserController {
	private _userService: UserService;
	constructor(userService: UserService) {
		console.log("passou");
		this._userService = userService;
	}

	async saveUser(request: Request, reply: ResponseToolkit) {
		const name = request.params.name;
		console.log({ name });
		const result = await this._userService.saveUser(name);
		console.log({ result });

		return reply.response({
			data: { ...result },
		});
	}
}
