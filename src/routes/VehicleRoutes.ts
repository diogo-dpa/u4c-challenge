import { Request, ResponseToolkit } from "@hapi/hapi";
import { VehicleController } from "../controllers/VehicleController";
import { VehicleRepository } from "../repositories/VehicleRepository";
import { AppDataSource } from "../config/database";
import { VehicleService } from "../services/VehicleService";
import {
	bodyVehicleCreateValidator,
	bodyVehicleUpdateValidator,
	generalParamsIdValidator,
} from "./routeValidators";
import { BaseRoutes } from "./BaseRoutes";

export class VehicleRoutes implements BaseRoutes {
	private _vehicleController: VehicleController;

	constructor() {
		const vehicleRepository = new VehicleRepository(AppDataSource);
		const vehicleService = new VehicleService(vehicleRepository);

		this._vehicleController = new VehicleController(vehicleService);
	}

	private getSpecific() {
		return {
			method: "GET",
			path: "/vehicles/{id}",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._vehicleController.getVehicle(request, reply),
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
			path: "/vehicles/{id}",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._vehicleController.deleteVehicle(request, reply),
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
			path: "/vehicles",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._vehicleController.saveVehicle(request, reply),
			options: {
				validate: {
					payload: bodyVehicleCreateValidator(),
				},
			},
		};
	}

	private update() {
		return {
			method: "PUT",
			path: "/vehicles/{id}",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._vehicleController.updateVehicle(request, reply),
			options: {
				validate: {
					params: generalParamsIdValidator(),
					payload: bodyVehicleUpdateValidator(),
				},
			},
		};
	}

	public returnDomainRoutes() {
		return [this.post(), this.getSpecific(), this.delete(), this.update()];
	}
}
