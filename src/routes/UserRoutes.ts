import { Request, ResponseToolkit } from "@hapi/hapi";
import { UserController } from "../controllers/UsersController";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import { AppDataSource } from "../config/database";
import { DocumentRepository } from "../repositories/DocumentRepository";
import { DocumentService } from "../services/DocumentService";
import { AddressRepository } from "../repositories/AddressRepository";
import { AddressService } from "../services/AddressService";
import {
	bodyUserCreateValidator,
	bodyUserUpdateValidator,
	generalParamsIdValidator,
} from "./routeValidators";

export class UserRoutes {
	private _userController: UserController;

	constructor() {
		const userRepository = new UserRepository(AppDataSource);
		const documentRepository = new DocumentRepository(AppDataSource);
		const documentService = new DocumentService(documentRepository);
		const addressRepository = new AddressRepository(AppDataSource);
		const addressService = new AddressService(addressRepository);
		const userService = new UserService(
			userRepository,
			documentService,
			addressService
		);
		this._userController = new UserController(userService);
	}

	private getSpecific() {
		return {
			method: "GET",
			path: "/users/{id}",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._userController.getUser(request, reply),
			options: {
				validate: {
					params: generalParamsIdValidator(),
				},
			},
		};
	}

	private delete() {
		return {
			method: "DELETE",
			path: "/users/{id}",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._userController.deleteUser(request, reply),
			options: {
				validate: {
					params: generalParamsIdValidator(),
				},
			},
		};
	}

	private post() {
		return {
			method: "POST",
			path: "/users",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._userController.saveUser(request, reply),
			options: {
				validate: {
					payload: bodyUserCreateValidator(),
				},
			},
		};
	}

	private update() {
		return {
			method: "PUT",
			path: "/users/{id}",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._userController.updateUser(request, reply),
			options: {
				validate: {
					params: generalParamsIdValidator(),
					payload: bodyUserUpdateValidator(),
				},
			},
		};
	}

	public returnDomainRoutes() {
		return [this.post(), this.getSpecific(), this.delete(), this.update()];
	}
}
