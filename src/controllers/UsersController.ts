import { Request, ResponseToolkit } from "@hapi/hapi";
import { UserService } from "../services/UserService";
import { ResponseHandler } from "./utils";
import {
	SUCCESS_CREATED_MESSAGE,
	SUCCESS_DELETED_MESSAGE,
	SUCCESS_GET_MESSAGE,
	SUCCESS_UPDATED_MESSAGE,
} from "../utils/consts";

export class UserController {
	private _userService: UserService;
	constructor(userService: UserService) {
		this._userService = userService;
	}

	async getUser(request: Request, reply: ResponseToolkit) {
		try {
			const { id } = request.params;
			const result = await this._userService.getUser(id);

			return ResponseHandler.successResponse(
				reply,
				SUCCESS_GET_MESSAGE,
				result
			);
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message);
		}
	}

	async deleteUser(request: Request, reply: ResponseToolkit) {
		try {
			const { id } = request.params;
			await this._userService.deleteUser(id);

			return ResponseHandler.successResponse(reply, SUCCESS_DELETED_MESSAGE);
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message);
		}
	}

	async saveUser(request: Request, reply: ResponseToolkit) {
		try {
			const {
				fullName,
				birthDate,
				email,
				cellphone,
				isThirdPartyUser,
				documents,
				address,
			} = request.payload as any;

			const result = await this._userService.saveUser(
				fullName,
				birthDate,
				email,
				cellphone,
				isThirdPartyUser,
				documents,
				address
			);

			return ResponseHandler.successResponse(
				reply,
				SUCCESS_CREATED_MESSAGE,
				result
			);
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message);
		}
	}

	async updateUser(request: Request, reply: ResponseToolkit) {
		try {
			const {
				fullName,
				birthDate,
				email,
				cellphone,
				isThirdPartyUser,
				address,
			} = request.payload as any;
			const { id } = request.params;

			const updatedUser = await this._userService.updateUser(id, {
				fullName,
				birthDate,
				email,
				cellphone,
				isThirdPartyUser,
				addresses: [address],
			} as any);

			return ResponseHandler.successResponse(
				reply,
				SUCCESS_UPDATED_MESSAGE,
				updatedUser
			);
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message);
		}
	}
}
