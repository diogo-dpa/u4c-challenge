import { Request, ResponseToolkit } from "@hapi/hapi";
import Joi from "joi";
import { UserController } from "../controllers/UsersController";
import { UserService } from "../services/UserServices";
import { UserRepository } from "../repositories/UserRepository";
import { AppDataSource } from "../config/database";

const userRepository = new UserRepository(AppDataSource);
const userService = new UserService(userRepository);

module.exports = [
	{
		method: "GET",
		path: "/users/{name}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new UserController(userService).saveUser(request, reply),
		options: {
			validate: {
				params: Joi.object({
					name: Joi.string().min(3).max(10),
				}),
			},
		},
	},
	{
		method: "GET",
		path: "/users",
		handler: (request: Request, reply: ResponseToolkit) =>
			new UserController(userService).saveUser(request, reply),
	},
];
