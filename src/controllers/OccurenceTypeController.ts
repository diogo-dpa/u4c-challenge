import { Request, ResponseToolkit } from "@hapi/hapi";
import { OccurenceTypeService } from "../services/OccurenceTypeService";
import { ResponseHandler } from "./utils";
import {
	SUCCESS_CREATED_MESSAGE,
	SUCCESS_DELETED_MESSAGE,
	SUCCESS_GET_MESSAGE,
	SUCCESS_UPDATED_MESSAGE,
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

	async deleteOccurenceType(request: Request, reply: ResponseToolkit) {
		try {
			const { id } = request.params;

			const result = await this._occurenceTypeService.deleteOccurenceType(id);
			console.log({ result });

			return ResponseHandler.successResponse(reply, SUCCESS_DELETED_MESSAGE);
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message);
		}
	}

	async saveOccurenceType(request: Request, reply: ResponseToolkit) {
		try {
			const { type } = request.payload as any;

			const result = await this._occurenceTypeService.saveOccurenceType(type);
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

	async updateOccurenceType(request: Request, reply: ResponseToolkit) {
		try {
			const { type } = request.payload as any;

			const { id } = request.params;

			const updatedRegister =
				await this._occurenceTypeService.updateOccurenceType(id, type);
			console.log({ updatedRegister });

			return ResponseHandler.successResponse(
				reply,
				SUCCESS_UPDATED_MESSAGE,
				updatedRegister
			);
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message);
		}
	}
}
