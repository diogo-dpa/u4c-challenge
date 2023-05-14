import { Request, ResponseToolkit } from "@hapi/hapi";
import Joi from "joi";
import { VehicleController } from "../controllers/VehicleController";
import { VehicleRepository } from "../repositories/VehicleRepository";

import { AppDataSource } from "../config/database";
import { VehicleService } from "../services/VehicleService";
const vehicleRepository = new VehicleRepository(AppDataSource);
const vehicleService = new VehicleService(vehicleRepository);

export const vehicleRoutes = [
	{
		method: "POST",
		path: "/Vehicles",
		handler: (request: Request, reply: ResponseToolkit) =>
			new VehicleController(vehicleService).saveVehicle(request, reply),
		options: {
			validate: {
				payload: Joi.object({
					brand: Joi.string().min(2).max(10),
					model: Joi.string().isoDate().required(),
					fabricationYear: Joi.string().email().required(),
					modelYear: Joi.string().optional(),
					chassis: Joi.string().email().required(),
                    plate: Joi.string().email().required(),
                    mileage: Joi.string().email().required(),
                    ownerId: Joi.string().email().required(),
				}),
			},
		},
	},
	{
		method: "GET",
		path: "/Vehicles/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new VehicleController(vehicleService).getVehicle(request, reply),
		options: {
			validate: {
				params: Joi.object({
                    id: Joi.string().required()
				}),
			},
		},
	},
	{
		method: "DELETE",
		path: "/Vehicles/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new VehicleController(vehicleService).getVehicle(request, reply),
		options: {
			validate: {
				params: Joi.object({
                    id: Joi.string().required()
				}),
			},
		},
	},
	{
		method: "PUT",
		path: "/Vehicles/{id}",
		handler: (request: Request, reply: ResponseToolkit) =>
			new VehicleController(vehicleService).deleteVehicle(request, reply),
		options: {
			validate: {
				params: Joi.object({
                    id: Joi.string().required()
				}),
				payload: Joi.object({
					brand: Joi.string().min(2).max(10).optional(),
					model: Joi.string().isoDate().optional(),
					fabricationYear: Joi.string().email().optional(),
					modelYear: Joi.string().optional(),
					chassis: Joi.string().email().optional(),
                    plate: Joi.string().email().optional(),
                    mileage: Joi.string().email().optional(),
                    ownerId: Joi.string().email().optional(),
				}),
			},
		},
	},
];