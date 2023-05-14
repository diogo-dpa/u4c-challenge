import { Vehicle } from "../config/entities/Vehicle";

export abstract class IVehicleRepository {
	public abstract saveVehicle(
		type: string,
	): Promise<Vehicle>;

    public abstract getAllVehicle(): Promise<Vehicle[]>;

    public abstract getVehicle(
		id: number,
	): Promise<Vehicle>;

    public abstract updateVehicle(
		id: number,
        updatedVehicle: Vehicle,
	): Promise<Vehicle>;

    public abstract deleteVehicle(
		id: number,
	): Promise<Vehicle>;
}
