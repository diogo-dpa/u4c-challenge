import { Request, ResponseToolkit } from "@hapi/hapi";
import { EventController } from "../controllers/EventController";
import { EventRepository } from "../repositories/EventRepository";

import { AppDataSource } from "../config/database";
import { EventService } from "../services/EventService";
import {
	bodyEventCreateValidator,
	bodyEventUpdateValidator,
	generalParamsIdValidator,
} from "./routeValidators";
const eventRepository = new EventRepository(AppDataSource);
const eventService = new EventService(eventRepository);

export const eventRoutes = [
	{
		method: "GET",
		path: "/events/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new EventController(eventService).getEvent(request, reply),
		options: {
			validate: {
				params: generalParamsIdValidator(),
			},
		},
	},
	{
		method: "DELETE",
		path: "/events/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new EventController(eventService).deleteEvent(request, reply),
		options: {
			validate: {
				params: generalParamsIdValidator(),
			},
		},
	},
	{
		method: "POST",
		path: "/events",
		handler: (request: Request, reply: ResponseToolkit) =>
			new EventController(eventService).saveEvent(request, reply),
		options: {
			validate: {
				payload: bodyEventCreateValidator(),
			},
		},
	},
	{
		method: "PUT",
		path: "/events/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new EventController(eventService).updateEvent(request, reply),
		options: {
			validate: {
				params: generalParamsIdValidator(),
				payload: bodyEventUpdateValidator(),
			},
		},
	},
];
