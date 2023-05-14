import { OccurenceType } from "../config/entities/OccurenceType";
import { IOccurenceTypeService } from "../iservices/IOccurenceTypeService";
import { OccurenceTypeRepository } from "../repositories/OccurenceTypeRepository";

export class OccurenceTypeService implements IOccurenceTypeService {
	private _OccurenceTypeRepository: OccurenceTypeRepository;

	constructor(OccurenceTypeRepository: OccurenceTypeRepository) {
		this._OccurenceTypeRepository = OccurenceTypeRepository;
	}
    public saveOccurenceType(type: string): Promise<OccurenceType> {
        throw new Error("Method not implemented.");
    }
    public getAllOccurenceType(): Promise<OccurenceType[]> {
        throw new Error("Method not implemented.");
    }
    public updateOccurenceType(id: number, updatedOccurenceType: OccurenceType): Promise<OccurenceType> {
        throw new Error("Method not implemented.");
    }
	public getOccurenceType(id: number): Promise<OccurenceType> {
		throw new Error("Method not implemented.");
	}
	public deleteOccurenceType(id: number): Promise<OccurenceType> {
		throw new Error("Method not implemented.");
	}

}
