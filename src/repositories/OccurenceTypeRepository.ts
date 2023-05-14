import { OccurenceType } from "../config/entities/OccurenceType";
import { IOccurenceTypeRepository } from "../irepositories/IOccurenceTypeRepository";
import { DataSource, Repository } from "typeorm";

export class OccurenceTypeRepository implements IOccurenceTypeRepository {
	private _dbConnection: Repository<OccurenceType>;

	constructor(dbConnection: DataSource) {
		this._dbConnection = dbConnection.getRepository(OccurenceType);
	}
    public getOccurenceType(id: number): Promise<OccurenceType> {
        throw new Error("Method not implemented.");
    }
    public updateOccurenceType(id: number, updatedType: string): Promise<OccurenceType> {
        throw new Error("Method not implemented.");
    }
    public deleteOccurenceType(id: number): Promise<OccurenceType> {
        throw new Error("Method not implemented.");
    }
    public saveOccurenceType(type: string): Promise<OccurenceType> {
        throw new Error("Method not implemented.");
    }
    public getAllOccurenceType(): Promise<OccurenceType[]> {
        throw new Error("Method not implemented.");
    }
}
