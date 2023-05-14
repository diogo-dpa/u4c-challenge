import { Request, ResponseToolkit } from "@hapi/hapi";
import { VehicleService } from "../services/VehicleService";

export class VehicleController {
	private _VehicleService: VehicleService;
	constructor(VehicleService: VehicleService) {
		this._VehicleService = VehicleService;
	}

	async saveVehicle(request: Request, reply: ResponseToolkit) {
		const {
			type,
		} = request.payload as any;

		const result = await this._VehicleService.saveVehicle(
			type
		);
		console.log({ result });

		return reply.response({
			data: { ...result },
		});
	}

	async updateVehicle(request: Request, reply: ResponseToolkit){
		const {
			type
		} = request.payload as any;

		const { id } = request.params

		const result = await this._VehicleService.updateVehicle(
			id,
			type
		);
		console.log({ result });

		return reply.response({
			data: { ...result },
		});
	}

	async getVehicle(request: Request, reply: ResponseToolkit){
		const { id } = request.params

		const result = await this._VehicleService.getVehicle(
			id
		);
		console.log({ result });

		return reply.response({
			data: { ...result },
		});
	}

	async deleteVehicle(request: Request, reply: ResponseToolkit){
		const { id } = request.params

		const result = await this._VehicleService.deleteVehicle(
			id
		);
		console.log({ result });

		return reply.response({
			data: { ...result },
		});
	}
}
