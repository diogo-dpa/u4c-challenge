import { Document } from "../entities/Document";

export abstract class IDocumentService {
	public abstract saveDocument(
		rg: string,
		cpf: string,
		cnh: string
	): Promise<Document>;
}
