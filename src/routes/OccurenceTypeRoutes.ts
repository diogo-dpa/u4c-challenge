import { Request, ResponseToolkit } from "@hapi/hapi";
import { OccurenceTypeController } from "../controllers/OccurenceTypeController";
import { OccurenceTypeRepository } from "../repositories/OccurenceTypeRepository";
import { AppDataSource } from "../config/database";
import { OccurenceTypeService } from "../services/OccurenceTypeService";
import {
	bodyOccurenceTypeCreateUpdateValidator,
	generalParamsIdValidator,
} from "./routeValidators";
import { BaseRoutes } from "./BaseRoutes";

export class OccurenceType implements BaseRoutes {
	private _occurenceTypeController: OccurenceTypeController;

	constructor() {
		const occurenceTypeRepository = new OccurenceTypeRepository(AppDataSource);
		const occurenceTypeService = new OccurenceTypeService(
			occurenceTypeRepository
		);

		this._occurenceTypeController = new OccurenceTypeController(
			occurenceTypeService
		);
	}

	private getSpecific() {
		return {
			method: "GET",
			path: "/occurenceTypes/{id}",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._occurenceTypeController.getOccurenceType(request, reply),
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
			path: "/occurenceTypes/{id}",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._occurenceTypeController.deleteOccurenceType(request, reply),
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
			path: "/occurenceTypes",
			handler: (request: Request, reply: ResponseToolkit) =>
				this._occurenceTypeController.saveOccurenceType(request, reply),
			options: {
				validate: {
					payload: bodyOccurenceTypeCreateUpdateValidator(),
				},
			},
		};
	}

	public returnDomainRoutes() {
		return [this.post(), this.getSpecific(), this.delete()];
	}
}
