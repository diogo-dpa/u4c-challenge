import { OccurenceType } from "../config/entities/OccurenceType";

export abstract class IOccurenceTypeRepository {
	public abstract getOccurenceType(id: number): Promise<OccurenceType>;
	public abstract deleteOccurenceType(id: number): Promise<void>;
	public abstract saveOccurenceType(type: string): Promise<OccurenceType>;
	public abstract updateOccurenceType(
		id: number,
		updatedType: string
	): Promise<string>;
}
