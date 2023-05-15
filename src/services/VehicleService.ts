import { Vehicle } from "../config/entities/Vehicle";
import { IVehicleService } from "../iservices/IVehicleService";
import { VehicleRepository } from "../repositories/VehicleRepository";

export class VehicleService implements IVehicleService {
	private _vehicleRepository: VehicleRepository;

	constructor(VehicleRepository: VehicleRepository) {
		this._vehicleRepository = VehicleRepository;
	}
	public async getVehicle(id: number): Promise<Vehicle> {
		return await this._vehicleRepository.getVehicle(id);
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
		return await this._vehicleRepository.updateVehicle(id, updatedVehicle);
	}
}
