import { Request, ResponseToolkit } from "@hapi/hapi";
import Joi from "joi";
import { UserController } from "../controllers/UsersController";
import { UserService } from "../services/UserServices";
import { UserRepository } from "../repositories/UserRepository";
import { AppDataSource } from "../config/database";
import { DocumentRepository } from "../repositories/DocumentRepository";
import { DocumentService } from "../services/DocumentService";
import { AddressRepository } from "../repositories/AddressRepository";
import { AddressService } from "../services/AddressService";

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

module.exports = [
	{
		method: "POST",
		path: "/users",
		handler: (request: Request, reply: ResponseToolkit) =>
			new UserController(userService).saveUser(request, reply),
		// options: {
		// 	validate: {
		// 		params: Joi.object({
		// 			name: Joi.string().min(3).max(10),
		// 		}),
		// 	},
		// },
	},
	{
		method: "GET",
		path: "/users",
		handler: (request: Request, reply: ResponseToolkit) =>
			new UserController(userService).saveUser(request, reply),
	},
];
