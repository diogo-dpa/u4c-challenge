import { Document } from "../config/entities/Document";

export abstract class IDocumentService {
	public abstract deleteDocument(id: number): Promise<void>;
	public abstract saveDocument(
		rg: string,
		cpf: string,
		cnh: string,
		passport?: string
	): Promise<Document>;
}
