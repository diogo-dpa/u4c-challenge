import { Request, ResponseToolkit } from "@hapi/hapi";
import { EventService } from "../services/EventService";
import { ResponseHandler } from "./utils";
import {
	SUCCESS_CREATED_MESSAGE,
	SUCCESS_DELETED_MESSAGE,
	SUCCESS_GET_MESSAGE,
	SUCCESS_UPDATED_MESSAGE,
} from "../utils/consts";

export class EventController {
	private _eventService: EventService;
	constructor(EventService: EventService) {
		this._eventService = EventService;
	}

	async getEvent(request: Request, reply: ResponseToolkit) {
		try {
			const { id } = request.params;

			const result = await this._eventService.getEvent(id);
			console.log({ result });

			return ResponseHandler.successResponse(
				reply,
				SUCCESS_GET_MESSAGE,
				result
			);
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message);
		}
	}

	async deleteEvent(request: Request, reply: ResponseToolkit) {
		try {
			const { id } = request.params;

			await this._eventService.deleteEvent(id);

			return ResponseHandler.successResponse(reply, SUCCESS_DELETED_MESSAGE);
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message);
		}
	}

	async saveEvent(request: Request, reply: ResponseToolkit) {
		try {
			const { type } = request.payload as any;

			const result = await this._eventService.saveEvent(type);
			console.log({ result });

			return ResponseHandler.successResponse(
				reply,
				SUCCESS_CREATED_MESSAGE,
				result
			);
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message);
		}
	}

	async updateEvent(request: Request, reply: ResponseToolkit) {
		try {
			const { type } = request.payload as any;

			const { id } = request.params;

			const updatedEvent = await this._eventService.updateEvent(id, type);
			console.log({ updatedEvent });

			return ResponseHandler.successResponse(
				reply,
				SUCCESS_UPDATED_MESSAGE,
				updatedEvent
			);
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message);
		}
	}
}
