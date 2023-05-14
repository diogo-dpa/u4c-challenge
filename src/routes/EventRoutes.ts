import { Request, ResponseToolkit } from "@hapi/hapi";
import Joi from "joi";
import { EventController } from "../controllers/EventController";
import { EventRepository } from "../repositories/EventRepository";

import { AppDataSource } from "../config/database";
import { EventService } from "../services/EventService";
const eventRepository = new EventRepository(AppDataSource);
const eventService = new EventService(eventRepository);

export const eventRoutes = [
	{
		method: "POST",
		path: "/events",
		handler: (request: Request, reply: ResponseToolkit) =>
			new EventController(eventService).saveEvent(request, reply),
		options: {
			validate: {
				payload: Joi.object({
					clientId: Joi.string().min(2).max(10),
					vehicleId: Joi.string().isoDate().required(),
                    occurenceType: Joi.string().required(),
                    occurenceDate: Joi.string().isoDate().required(),
					thirdPartyUsers: Joi.array().items(Joi.object({
                        fullName: Joi.string().min(2).max(10),
					    birthDate: Joi.string().isoDate().required(),
                        email: Joi.string().email().optional(),
                        cellphone: Joi.string().optional(),
                        isThirdPartyEvent: Joi.string().email().optional(),
                        documents: Joi.object({
                            rg: Joi.string().min(8).max(8).optional(),
                            cpf: Joi.string().min(11).max(11).optional(),
                            cnh: Joi.string().min(10).max(10).optional(),
                            passport: Joi.string().optional()
                        }).optional(),
                        address: Joi.object({
                            zipcode: Joi.string().min(8).max(8).optional(),
                            street: Joi.string().min(5).max(50).optional(),
                            number: Joi.number().optional(),
                            complement: Joi.string().max(50).optional(),
                            state: Joi.string().min(5).max(50).optional(),
                            country: Joi.string().min(4).max(50).optional(),
                            neighborhood: Joi.string().min(2).max(50).optional()
                        }).required()
                    })).optional(),
				}),
			},
		},
	},
	{
		method: "GET",
		path: "/events/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new EventController(eventService).getEvent(request, reply),
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
		path: "/events/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new EventController(eventService).getEvent(request, reply),
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
		path: "/events/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new EventController(eventService).deleteEvent(request, reply),
		options: {
			validate: {
				params: Joi.object({
					id: Joi.string().required()
				}),
				payload: Joi.object({
					clientId: Joi.string().min(2).max(10),
					vehicleId: Joi.string().isoDate().required(),
                    occurenceType: Joi.string().required(),
                    occurenceDate: Joi.string().isoDate().required(),
					thirdPartyUsers: Joi.array().items(Joi.object({
                        fullName: Joi.string().min(2).max(10),
					    birthDate: Joi.string().isoDate().required(),
                        email: Joi.string().email().optional(),
                        cellphone: Joi.string().optional(),
                        isThirdPartyEvent: Joi.string().email().optional(),
                        documents: Joi.object({
                            rg: Joi.string().min(8).max(8).optional(),
                            cpf: Joi.string().min(11).max(11).optional(),
                            cnh: Joi.string().min(10).max(10).optional(),
                            passport: Joi.string().optional()
                        }).optional(),
                        address: Joi.object({
                            zipcode: Joi.string().min(8).max(8).optional(),
                            street: Joi.string().min(5).max(50).optional(),
                            number: Joi.number().optional(),
                            complement: Joi.string().max(50).optional(),
                            state: Joi.string().min(5).max(50).optional(),
                            country: Joi.string().min(4).max(50).optional(),
                            neighborhood: Joi.string().min(2).max(50).optional()
                        }).required()
                    })).optional(),
				}),
			},
		},
	},
];