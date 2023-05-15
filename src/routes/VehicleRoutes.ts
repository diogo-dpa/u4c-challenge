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
const vehicleRepository = new VehicleRepository(AppDataSource);
const vehicleService = new VehicleService(vehicleRepository);

export const vehicleRoutes = [
	{
		method: "GET",
		path: "/Vehicles/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new VehicleController(vehicleService).getVehicle(request, reply),
		options: {
			validate: {
				params: generalParamsIdValidator(),
			},
		},
	},
	{
		method: "DELETE",
		path: "/Vehicles/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new VehicleController(vehicleService).deleteVehicle(request, reply),
		options: {
			validate: {
				params: generalParamsIdValidator(),
			},
		},
	},
	{
		method: "POST",
		path: "/vehicles",
		handler: (request: Request, reply: ResponseToolkit) =>
			new VehicleController(vehicleService).saveVehicle(request, reply),
		options: {
			validate: {
				payload: bodyVehicleCreateValidator(),
			},
		},
	},
	{
		method: "PUT",
		path: "/Vehicles/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new VehicleController(vehicleService).updateVehicle(request, reply),
		options: {
			validate: {
				params: generalParamsIdValidator(),
				payload: bodyVehicleUpdateValidator(),
			},
		},
	},
];
