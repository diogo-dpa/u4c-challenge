import { Document } from "../config/entities/Document";

export abstract class IDocumentRepository {
	public abstract getDocument(id: number): Promise<Document>;

	public abstract deleteDocument(id: number): Promise<Document>;
	public abstract saveDocument(
		rg: string,
		cpf: string,
		cnh: string
	): Promise<Document>;

	public abstract updateDocument(
		id: number,
		updatedDocument?: string
	): Promise<Document>;
}
