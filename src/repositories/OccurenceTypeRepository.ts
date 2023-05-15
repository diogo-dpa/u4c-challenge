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
		const occurenceTyoeFound = await this._dbConnection.findOneBy({
			id,
		});

		if (!occurenceTyoeFound)
			throw new Error(OCCURENCE_TYPE_NOT_FOUND_ERROR_MESSAGE);

		await this._dbConnection.remove(occurenceTyoeFound);
	}
	public async saveOccurenceType(type: string): Promise<OccurenceType> {
		const ocRegister = {
			type,
		} as OccurenceType;
		const result = await this._dbConnection.save(ocRegister);
		console.log({ result });
		return result;
	}
	public async updateOccurenceType(
		id: number,
		updatedType: string
	): Promise<string> {
		const otFound = await this._dbConnection.findOneBy({ id });

		if (!otFound) throw new Error(OCCURENCE_TYPE_NOT_FOUND_ERROR_MESSAGE);
		console.log({ otFound });

		const updatedTypeRegsiter = await this._dbConnection.save({
			...otFound,
			type: updatedType ?? otFound.type,
		});
		return updatedTypeRegsiter.type;
	}
}
