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
import { BaseRoutes } from "./BaseRoutes";

export class EventRoutes implements BaseRoutes {
	private _eventController: EventController;

	constructor() {
		const eventRepository = new EventRepository(AppDataSource);
		const eventService = new EventService(eventRepository);

		this._eventController = new EventController(eventService);
	}

	private getSpecific() {
		return {
			method: "GET",
			path: "/events/{id}",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._eventController.getEvent(request, reply),
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
			path: "/events/{id}",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._eventController.deleteEvent(request, reply),
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
			path: "/events",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._eventController.saveEvent(request, reply),
			options: {
				validate: {
					payload: bodyEventCreateValidator(),
				},
			},
		};
	}

	private update() {
		return {
			method: "PUT",
			path: "/events/{id}",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._eventController.updateEvent(request, reply),
			options: {
				validate: {
					params: generalParamsIdValidator(),
					payload: bodyEventUpdateValidator(),
				},
			},
		};
	}

	public returnDomainRoutes() {
		return [this.post(), this.getSpecific(), this.delete(), this.update()];
	}
}
