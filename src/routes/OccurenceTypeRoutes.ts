import { Request, ResponseToolkit } from "@hapi/hapi";
import { OccurenceTypeController } from "../controllers/OccurenceTypeController";
import { OccurenceTypeRepository } from "../repositories/OccurenceTypeRepository";

import { AppDataSource } from "../config/database";
import { OccurenceTypeService } from "../services/OccurenceTypeService";
import {
	bodyOccurenceTypeCreateUpdateValidator,
	generalParamsIdValidator,
} from "./routeValidators";
const occurenceTypeRepository = new OccurenceTypeRepository(AppDataSource);
const occurenceTypeService = new OccurenceTypeService(occurenceTypeRepository);

export const occurenceTypeRoutes = [
	{
		method: "GET",
		path: "/occurenceTypes/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new OccurenceTypeController(occurenceTypeService).getOccurenceType(
				request,
				reply
			),
		options: {
			validate: {
				params: generalParamsIdValidator(),
			},
		},
	},
	{
		method: "DELETE",
		path: "/OccurenceTypes/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new OccurenceTypeController(occurenceTypeService).deleteOccurenceType(
				request,
				reply
			),
		options: {
			validate: {
				params: generalParamsIdValidator(),
			},
		},
	},
	{
		method: "POST",
		path: "/occurenceTypes",
		handler: (request: Request, reply: ResponseToolkit) =>
			new OccurenceTypeController(occurenceTypeService).saveOccurenceType(
				request,
				reply
			),
		options: {
			validate: {
				payload: bodyOccurenceTypeCreateUpdateValidator(),
			},
		},
	},
	{
		method: "PUT",
		path: "/OccurenceTypes/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new OccurenceTypeController(occurenceTypeService).updateOccurenceType(
				request,
				reply
			),
		options: {
			validate: {
				params: generalParamsIdValidator(),
				payload: bodyOccurenceTypeCreateUpdateValidator(),
			},
		},
	},
];
