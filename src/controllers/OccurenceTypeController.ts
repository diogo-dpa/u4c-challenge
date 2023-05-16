import { Request, ResponseToolkit } from "@hapi/hapi";
import { OccurenceTypeService } from "../services/OccurenceTypeService";
import { ResponseHandler } from "./utils";
import {
	SUCCESS_CREATED_MESSAGE,
	SUCCESS_DELETED_MESSAGE,
	SUCCESS_GET_MESSAGE,
} from "../utils/consts";

export class OccurenceTypeController {
	private _occurenceTypeService: OccurenceTypeService;
	constructor(OccurenceTypeService: OccurenceTypeService) {
		this._occurenceTypeService = OccurenceTypeService;
	}

	async getOccurenceType(request: Request, reply: ResponseToolkit) {
		try {
			const { id } = request.params;

			const result = await this._occurenceTypeService.getOccurenceType(id);

			return ResponseHandler.successResponse(
				reply,
				SUCCESS_GET_MESSAGE,
				result
			);
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message);
		}
	}

	async deleteOccurenceType(request: Request, reply: ResponseToolkit) {
		try {
			const { id } = request.params;

			await this._occurenceTypeService.deleteOccurenceType(id);

			return ResponseHandler.successResponse(reply, SUCCESS_DELETED_MESSAGE);
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message);
		}
	}

	async saveOccurenceType(request: Request, reply: ResponseToolkit) {
		try {
			const { type } = request.payload as any;

			const result = await this._occurenceTypeService.saveOccurenceType(type);

			return ResponseHandler.successResponse(
				reply,
				SUCCESS_CREATED_MESSAGE,
				result
			);
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message);
		}
	}
}
