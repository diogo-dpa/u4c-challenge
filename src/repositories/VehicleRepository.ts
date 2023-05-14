import { Vehicle } from "../config/entities/Vehicle";
import { IVehicleRepository } from "../irepositories/IVehicleRepository";
import { DataSource, Repository } from "typeorm";

export class VehicleRepository implements IVehicleRepository {
	private _dbConnection: Repository<Vehicle>;

	constructor(dbConnection: DataSource) {
		this._dbConnection = dbConnection.getRepository(Vehicle);
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
    public saveVehicle(type: string): Promise<Vehicle> {
        throw new Error("Method not implemented.");
    }
    public getAllVehicle(): Promise<Vehicle[]> {
        throw new Error("Method not implemented.");
    }
}
