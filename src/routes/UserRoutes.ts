import { Request, ResponseToolkit } from "@hapi/hapi";
import Joi, { ErrorReport, ValidationErrorFunction, ValidationErrorItem } from "joi";
import { UserController } from "../controllers/UsersController";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import { AppDataSource } from "../config/database";
import { DocumentRepository } from "../repositories/DocumentRepository";
import { DocumentService } from "../services/DocumentService";
import { AddressRepository } from "../repositories/AddressRepository";
import { AddressService } from "../services/AddressService";


export class UserRoutes {
	
	private _userController: UserController;
	
	constructor(){
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

	private post(){
		return {
			method: "POST",
			path: "/users",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._userController.saveUser(request, reply),
			options: {
				validate: {
					payload: Joi.object({
						fullName: Joi.string().min(2).max(10).required()
						.error((errors: any) => {
							errors.forEach(err => {
							  switch (err.code) {
								case "any.empty":
								  err.message = "Value should not be empty!";
								  break;
								case "string.min":
								  err.message = `Value should have at least ${err.local.limit} characters!`;
								  break;
								case "string.max":
								  err.message = `Value should have at most ${err.local.limit} characters!`;
								  break;
								default:
								  break;
							  }
							});
							return errors;
						}),
						birthDate: Joi.string().required(),
						email: Joi.string().email().required(),
						cellphone: Joi.string().optional(),
						isThirdPartyUser: Joi.boolean().required(),
						documents: Joi.object({
							rg: Joi.string().min(8).max(8).required(),
							cpf: Joi.string().min(11).max(11).required(),
							cnh: Joi.string().min(10).max(10).required(),
							passport: Joi.string().optional()
						}).required(),
						address: Joi.object({
							zipcode: Joi.string().min(8).max(8).required(),
							street: Joi.string().min(5).max(50).required(),
							number: Joi.number().required(),
							complement: Joi.string().max(50).optional(),
							state: Joi.string().min(2).max(50).required(),
							country: Joi.string().min(4).max(50).required(),
							neighborhood: Joi.string().min(2).max(50).required()
						}).required()
					}).error((errors: any) => {
						console.log({errors})
						
						return errors
					  }),
				},
			},
		}
	}

	private getSpecific(){
		return {
			method: "GET",
			path: "/users/{id}",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._userController.getUser(request, reply),
			options: {
				validate: {
					params: Joi.object({
						id: Joi.string().required()
					}),
				},
			},
		}
	}

	private delete() {
		return {
			method: "DELETE",
			path: "/users/{id}",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._userController.deleteUser(request, reply),
			options: {
				validate: {
					params: Joi.object({
						id: Joi.string().required()
					}),
				},
			},
		}
	}

	private update() {
		return {
			method: "PUT",
			path: "/users/{id}",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._userController.updateUser(request, reply),
			options: {
				validate: {
					params: Joi.object({
						id: Joi.string().required()
					}),
					payload: Joi.object({
						email: Joi.string().email().optional(),
						cellphone: Joi.string().optional(),
						isThirdPartyUser: Joi.boolean().optional(),
					}),
				},
			},
		}
	}

	public returnDomainRoutes(){
		return [
			this.post(),
			this.getSpecific(),
			this.delete(),
			this.update()
		]
	}
}
