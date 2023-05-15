import { OccurenceType } from "../config/entities/OccurenceType";
import { IOccurenceTypeService } from "../iservices/IOccurenceTypeService";
import { OccurenceTypeRepository } from "../repositories/OccurenceTypeRepository";

export class OccurenceTypeService implements IOccurenceTypeService {
	private _occurenceTypeRepository: OccurenceTypeRepository;

	constructor(OccurenceTypeRepository: OccurenceTypeRepository) {
		this._occurenceTypeRepository = OccurenceTypeRepository;
	}
	public async getOccurenceType(id: number): Promise<OccurenceType> {
		return await this._occurenceTypeRepository.getOccurenceType(id);
	}
	public async deleteOccurenceType(id: number): Promise<void> {
		await this._occurenceTypeRepository.deleteOccurenceType(id);
	}
	public async saveOccurenceType(type: string): Promise<OccurenceType> {
		return await this._occurenceTypeRepository.saveOccurenceType(type);
	}
	public async updateOccurenceType(
		id: number,
		updatedOccurenceType: string
	): Promise<string> {
		return await this._occurenceTypeRepository.updateOccurenceType(
			id,
			updatedOccurenceType
		);
	}
}
