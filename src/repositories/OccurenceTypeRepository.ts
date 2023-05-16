import { OccurenceType } from "../config/entities/OccurenceType";
import { IOccurenceTypeRepository } from "../irepositories/IOccurenceTypeRepository";
import { DataSource, Repository } from "typeorm";
import { OCCURENCE_TYPE_NOT_FOUND_ERROR_MESSAGE } from "../utils/consts";

export class OccurenceTypeRepository implements IOccurenceTypeRepository {
	private _dbConnection: Repository<OccurenceType>;

	constructor(dbConnection: DataSource) {
		this._dbConnection = dbConnection.getRepository(OccurenceType);
	}
	public async getOccurenceType(id: number): Promise<OccurenceType> {
		return await this._dbConnection.findOneBy({ id });
	}
	public async deleteOccurenceType(id: number): Promise<void> {
		const occurenceTypeFound = await this._dbConnection.findOneBy({
			id,
		});

		if (!occurenceTypeFound)
			throw new Error(OCCURENCE_TYPE_NOT_FOUND_ERROR_MESSAGE);

		await this._dbConnection.remove(occurenceTypeFound);
	}
	public async saveOccurenceType(type: string): Promise<OccurenceType> {
		const ocRegister = {
			type,
		} as OccurenceType;
		return await this._dbConnection.save(ocRegister);
	}
}
