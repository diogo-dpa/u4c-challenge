import { Document } from "../entities/Document";

export abstract class IDocumentRepository {
	public abstract saveDocument(
		rg: string,
		cpf: string,
		cnh: string
	): Promise<Document>;
}
