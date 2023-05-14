import { OccurenceType } from "../config/entities/OccurenceType";

export abstract class IOccurenceTypeService {
	public abstract saveOccurenceType(
		type: string,
	): Promise<OccurenceType>;

    public abstract getAllOccurenceType(): Promise<OccurenceType[]>;

    public abstract getOccurenceType(
		id: number,
	): Promise<OccurenceType>;

    public abstract updateOccurenceType(
		id: number,
        updatedOccurenceType: OccurenceType,
	): Promise<OccurenceType>;

    public abstract deleteOccurenceType(
		id: number,
	): Promise<OccurenceType>;
}
