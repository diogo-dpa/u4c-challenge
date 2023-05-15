import { OccurenceType } from "../config/entities/OccurenceType";

export abstract class IOccurenceTypeService {
	public abstract getOccurenceType(id: number): Promise<OccurenceType>;

	public abstract deleteOccurenceType(id: number): Promise<void>;
	public abstract saveOccurenceType(type: string): Promise<OccurenceType>;
	public abstract updateOccurenceType(
		id: number,
		updatedOccurenceType: string
	): Promise<string>;
}
