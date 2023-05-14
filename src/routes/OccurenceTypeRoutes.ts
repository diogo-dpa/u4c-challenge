import { Request, ResponseToolkit } from "@hapi/hapi";
import Joi from "joi";
import { OccurenceTypeController } from "../controllers/OccurenceTypeController";
import { OccurenceTypeRepository } from "../repositories/OccurenceTypeRepository";

import { AppDataSource } from "../config/database";
import { OccurenceTypeService } from "../services/OccurenceTypeService";
const occurenceTypeRepository = new OccurenceTypeRepository(AppDataSource);
const occurenceTypeService = new OccurenceTypeService(occurenceTypeRepository);

export const occurenceTypeRoutes = [
	{
		method: "POST",
		path: "/occurenceTypes",
		handler: (request: Request, reply: ResponseToolkit) =>
			new OccurenceTypeController(occurenceTypeService).saveOccurenceType(request, reply),
		options: {
			validate: {
				payload: Joi.object({
					type: Joi.string().email().required(),
				}),
			},
		},
	},
	{
		method: "GET",
		path: "/occurenceTypes/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new OccurenceTypeController(occurenceTypeService).getOccurenceType(request, reply),
		options: {
			validate: {
				params: Joi.object({
                    id: Joi.string().required()
				}),
			},
		},
	},
	{
		method: "DELETE",
		path: "/OccurenceTypes/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new OccurenceTypeController(occurenceTypeService).getOccurenceType(request, reply),
		options: {
			validate: {
				params: Joi.object({
                    id: Joi.string().required()
				}),
			},
		},
	},
	{
		method: "PUT",
		path: "/OccurenceTypes/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new OccurenceTypeController(occurenceTypeService).deleteOccurenceType(request, reply),
		options: {
			validate: {
				params: Joi.object({
                    id: Joi.string().required()
				}),
				payload: Joi.object({
					type: Joi.string().email().required(),
				}).required(),
			},
		},
	},
];