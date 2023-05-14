import { Request, ResponseToolkit } from "@hapi/hapi";
import { OccurenceTypeService } from "../services/OccurenceTypeService";

export class OccurenceTypeController {
	private _OccurenceTypeService: OccurenceTypeService;
	constructor(OccurenceTypeService: OccurenceTypeService) {
		this._OccurenceTypeService = OccurenceTypeService;
	}

	async saveOccurenceType(request: Request, reply: ResponseToolkit) {
		const {
			type,
		} = request.payload as any;

		const result = await this._OccurenceTypeService.saveOccurenceType(
			type
		);
		console.log({ result });

		return reply.response({
			data: { ...result },
		});
	}

	async updateOccurenceType(request: Request, reply: ResponseToolkit){
		const {
			type
		} = request.payload as any;

		const { id } = request.params

		const result = await this._OccurenceTypeService.updateOccurenceType(
			id,
			type
		);
		console.log({ result });

		return reply.response({
			data: { ...result },
		});
	}

	async getOccurenceType(request: Request, reply: ResponseToolkit){
		const { id } = request.params

		const result = await this._OccurenceTypeService.getOccurenceType(
			id
		);
		console.log({ result });

		return reply.response({
			data: { ...result },
		});
	}

	async deleteOccurenceType(request: Request, reply: ResponseToolkit){
		const { id } = request.params

		const result = await this._OccurenceTypeService.deleteOccurenceType(
			id
		);
		console.log({ result });

		return reply.response({
			data: { ...result },
		});
	}
}
