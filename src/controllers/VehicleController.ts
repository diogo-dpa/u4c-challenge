import { Request, ResponseToolkit } from "@hapi/hapi";
import { VehicleService } from "../services/VehicleService";
import { ResponseHandler } from "./utils";
import {
	SUCCESS_CREATED_MESSAGE,
	SUCCESS_DELETED_MESSAGE,
	SUCCESS_GET_MESSAGE,
	SUCCESS_UPDATED_MESSAGE,
} from "../utils/consts";

export class VehicleController {
	private _vehicleService: VehicleService;
	constructor(VehicleService: VehicleService) {
		this._vehicleService = VehicleService;
	}
	async getVehicle(request: Request, reply: ResponseToolkit) {
		try {
			const { id } = request.params;

			const result = await this._vehicleService.getVehicle(id);
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

	async deleteVehicle(request: Request, reply: ResponseToolkit) {
		try {
			const { id } = request.params;

			const result = await this._vehicleService.deleteVehicle(id);
			console.log({ result });

			return ResponseHandler.successResponse(reply, SUCCESS_DELETED_MESSAGE);
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message);
		}
	}

	async saveVehicle(request: Request, reply: ResponseToolkit) {
		try {
			const { type } = request.payload as any;

			const result = await this._vehicleService.saveVehicle(type);
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

	async updateVehicle(request: Request, reply: ResponseToolkit) {
		try {
			const { type } = request.payload as any;

			const { id } = request.params;

			const updatedVehicle = await this._vehicleService.updateVehicle(id, type);
			console.log({ updatedVehicle });

			return ResponseHandler.successResponse(
				reply,
				SUCCESS_UPDATED_MESSAGE,
				updatedVehicle
			);
		} catch (err) {
			return ResponseHandler.errorResponse(reply, err.message);
		}
	}
}
