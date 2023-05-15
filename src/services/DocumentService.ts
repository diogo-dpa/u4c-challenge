import { Document } from "../config/entities/Document";
import { IDocumentService } from "../iservices/IDocumentService";
import { DocumentRepository } from "../repositories/DocumentRepository";

export class DocumentService implements IDocumentService {
	private _documentRepository: DocumentRepository;

	constructor(documentRepository: DocumentRepository) {
		this._documentRepository = documentRepository;
	}
	public getDocument(id: number): Promise<Document> {
		throw new Error("Method not implemented.");
	}
	public deleteDocument(id: number): Promise<Document> {
		throw new Error("Method not implemented.");
	}
	public updateDocument(
		id: number,
		updatedDocument?: string
	): Promise<Document> {
		throw new Error("Method not implemented.");
	}

	async saveDocument(rg: string, cpf: string, cnh: string): Promise<Document> {
		const result = await this._documentRepository.saveDocument(rg, cpf, cnh);
		return result;
	}
}
