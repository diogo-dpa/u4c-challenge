import { Vehicle } from "../config/entities/Vehicle";

export abstract class IVehicleService {
	public abstract getVehicle(id: number): Promise<Vehicle>;
	public abstract deleteVehicle(id: number): Promise<void>;
	public abstract saveVehicle(newVehicle: Vehicle): Promise<Vehicle>;

	public abstract updateVehicle(
		id: number,
		updatedVehicle: Vehicle
	): Promise<Vehicle>;
}
