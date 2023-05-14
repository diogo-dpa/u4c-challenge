import { Request, ResponseToolkit } from "@hapi/hapi";
import { UserService } from "../services/UserService";
import { ResponseHandler } from "./utils";

export class UserController {
	private _userService: UserService;
	constructor(userService: UserService) {
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
			address,
		} = request.payload as any;

		try {
			if (fullName?.includes('1')) throw new Error('Invalid parameters')

			const result = await this._userService.saveUser(
				fullName,
				birthDate,
				email,
				cellphone,
				isThirdPartyUser,
				documents,
				address
			);

			return ResponseHandler.successResponse(reply, 'ok', result);

		} catch(err) {
			return ResponseHandler.errorResponse(reply, err.message)
		}
	}

	async updateUser(request: Request, reply: ResponseToolkit){
		const {
			email,
			cellphone,
			isThirdPartyUser
		} = request.payload as any;

		try {
			const { id } = request.params
	
			const updatedUser = await this._userService.updateUser(
				id,
				email,
				cellphone,
				isThirdPartyUser
			);
	
			return ResponseHandler.successResponse(
				reply,
				"Success updated",
				updatedUser
			)
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message)
		}

	}

	async getUser(request: Request, reply: ResponseToolkit){
		const { id } = request.params

		try {
			const result = await this._userService.getUser(
				id
			);
	
			return ResponseHandler.successResponse(
				reply,
				'ok',
				result
			) 
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message)
		}
	}

	async deleteUser(request: Request, reply: ResponseToolkit){
		const { id } = request.params

		try {
			await this._userService.deleteUser(
				id
			);
	
			return ResponseHandler.successResponse(
				reply,
				"Success deleted"
			) 
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message)
		}

	}
}
