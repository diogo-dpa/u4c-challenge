import { Vehicle } from "../config/entities/Vehicle";
import { IVehicleRepository } from "../irepositories/IVehicleRepository";
import { DataSource, Repository } from "typeorm";
import { VEHICLE_NOT_FOUND_ERROR_MESSAGE } from "../utils/consts";

export class VehicleRepository implements IVehicleRepository {
	private _dbConnection: Repository<Vehicle>;

	constructor(dbConnection: DataSource) {
		this._dbConnection = dbConnection.getRepository(Vehicle);
	}
	public async getVehicle(id: number): Promise<Vehicle> {
		const vehiclesFound = await this._dbConnection.find({
			where: {
				id,
			},
			relations: {
				owner: true,
			},
		});

		return vehiclesFound.pop();
	}
	public async deleteVehicle(id: number): Promise<void> {
		const vehicleFound = await this._dbConnection.findOneBy({
			id,
		});

		if (!vehicleFound) throw new Error(VEHICLE_NOT_FOUND_ERROR_MESSAGE);

		await this._dbConnection.remove(vehicleFound);
	}
	public async saveVehicle(newVehicle: Vehicle): Promise<Vehicle> {
		return await this._dbConnection.save(newVehicle);
	}
	public async updateVehicle(
		id: number,
		updatedVehicle: Vehicle
	): Promise<Vehicle> {
		const { brand, fabricationYear, mileage, model, modelYear, plate } =
			updatedVehicle;

		const vehiclesFound = await this._dbConnection.find({
			where: {
				id,
			},
			relations: {
				owner: true,
			},
		});

		const vehicleFound = vehiclesFound.pop();
		if (!vehicleFound) throw new Error(VEHICLE_NOT_FOUND_ERROR_MESSAGE);

		return await this._dbConnection.save({
			...vehicleFound,
			brand: brand ?? vehicleFound.brand,
			fabricationYear: fabricationYear ?? vehicleFound.fabricationYear,
			mileage: mileage ?? vehicleFound.mileage,
			model: model ?? vehicleFound.model,
			modelYear: modelYear ?? vehicleFound.modelYear,
			plate: plate ?? vehicleFound.plate,
		});
	}
}
