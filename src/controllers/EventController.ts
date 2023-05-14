import { Request, ResponseToolkit } from "@hapi/hapi";
import { EventService } from "../services/EventService";

export class EventController {
	private _EventService: EventService;
	constructor(EventService: EventService) {
		this._EventService = EventService;
	}

	async saveEvent(request: Request, reply: ResponseToolkit) {
		const {
			type,
		} = request.payload as any;

		const result = await this._EventService.saveEvent(
			type
		);
		console.log({ result });

		return reply.response({
			data: { ...result },
		});
	}

	async updateEvent(request: Request, reply: ResponseToolkit){
		const {
			type
		} = request.payload as any;

		const { id } = request.params

		const result = await this._EventService.updateEvent(
			id,
			type
		);
		console.log({ result });

		return reply.response({
			data: { ...result },
		});
	}

	async getEvent(request: Request, reply: ResponseToolkit){
		const { id } = request.params

		const result = await this._EventService.getEvent(
			id
		);
		console.log({ result });

		return reply.response({
			data: { ...result },
		});
	}

	async deleteEvent(request: Request, reply: ResponseToolkit){
		const { id } = request.params

		const result = await this._EventService.deleteEvent(
			id
		);
		console.log({ result });

		return reply.response({
			data: { ...result },
		});
	}
}
