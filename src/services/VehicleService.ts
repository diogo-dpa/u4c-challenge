import { Vehicle } from "../config/entities/Vehicle";
import { IVehicleService } from "../iservices/IVehicleService";
import { VehicleRepository } from "../repositories/VehicleRepository";
import {
	FIELD_DOES_NOT_ALLOWED_UPDATE_ERROR_MESSAGE,
	VEHICLE_NOT_FOUND_ERROR_MESSAGE,
} from "../utils/consts";

export class VehicleService implements IVehicleService {
	private _vehicleRepository: VehicleRepository;

	constructor(VehicleRepository: VehicleRepository) {
		this._vehicleRepository = VehicleRepository;
	}
	public async getVehicle(id: number): Promise<Vehicle> {
		const foundVehicle = await this._vehicleRepository.getVehicle(id);

		if (!foundVehicle) throw Error(VEHICLE_NOT_FOUND_ERROR_MESSAGE);

		return foundVehicle;
	}
	public async deleteVehicle(id: number): Promise<void> {
		await this._vehicleRepository.deleteVehicle(id);
	}
	public async saveVehicle(newVehicle: Vehicle): Promise<Vehicle> {
		return await this._vehicleRepository.saveVehicle(newVehicle);
	}
	public async updateVehicle(
		id: number,
		updatedVehicle: Vehicle
	): Promise<Vehicle> {
		const { chassis } = updatedVehicle;

		if (!!chassis) throw Error(FIELD_DOES_NOT_ALLOWED_UPDATE_ERROR_MESSAGE);

		return await this._vehicleRepository.updateVehicle(id, updatedVehicle);
	}
}
