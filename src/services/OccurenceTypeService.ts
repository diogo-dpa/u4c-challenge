import { OccurenceType } from "../config/entities/OccurenceType";
import { IOccurenceTypeService } from "../iservices/IOccurenceTypeService";
import { OccurenceTypeRepository } from "../repositories/OccurenceTypeRepository";
import {
	OCCURENCE_TYPE_NOT_EXISTS_ERROR_MESSAGE,
	OCCURENCE_TYPE_NOT_FOUND_ERROR_MESSAGE,
} from "../utils/consts";
import { OccurenceTypeOptions } from "../utils/enums";

export class OccurenceTypeService implements IOccurenceTypeService {
	private _occurenceTypeRepository: OccurenceTypeRepository;

	constructor(OccurenceTypeRepository: OccurenceTypeRepository) {
		this._occurenceTypeRepository = OccurenceTypeRepository;
	}
	public async getOccurenceType(id: number): Promise<OccurenceType> {
		const ocFound = await this._occurenceTypeRepository.getOccurenceType(id);

		if (!ocFound) throw Error(OCCURENCE_TYPE_NOT_FOUND_ERROR_MESSAGE);

		return ocFound;
	}
	public async deleteOccurenceType(id: number): Promise<void> {
		await this._occurenceTypeRepository.deleteOccurenceType(id);
	}
	public async saveOccurenceType(type: string): Promise<OccurenceType> {
		if (
			!Object.values(OccurenceTypeOptions).includes(
				type as OccurenceTypeOptions
			)
		)
			throw Error(OCCURENCE_TYPE_NOT_EXISTS_ERROR_MESSAGE);

		return await this._occurenceTypeRepository.saveOccurenceType(type);
	}
}
