import { Vehicle } from "../config/entities/Vehicle";
import { IVehicleService } from "../iservices/IVehicleService";
import { VehicleRepository } from "../repositories/VehicleRepository";

export class VehicleService implements IVehicleService {
	private _VehicleRepository: VehicleRepository;

	constructor(VehicleRepository: VehicleRepository) {
		this._VehicleRepository = VehicleRepository;
	}
    public saveVehicle(type: string): Promise<Vehicle> {
        throw new Error("Method not implemented.");
    }
    public getAllVehicle(): Promise<Vehicle[]> {
        throw new Error("Method not implemented.");
    }
    public updateVehicle(id: number, updatedVehicle: Vehicle): Promise<Vehicle> {
        throw new Error("Method not implemented.");
    }
	public getVehicle(id: number): Promise<Vehicle> {
		throw new Error("Method not implemented.");
	}
	public deleteVehicle(id: number): Promise<Vehicle> {
		throw new Error("Method not implemented.");
	}

}
