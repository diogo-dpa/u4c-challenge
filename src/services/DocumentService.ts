import { Document } from "../entities/Document";
import { IDocumentService } from "../iservices/IDocumentService";
import { DocumentRepository } from "../repositories/DocumentRepository";

export class DocumentService implements IDocumentService {
	private _documentRepository: DocumentRepository;

	constructor(documentRepository: DocumentRepository) {
		this._documentRepository = documentRepository;
	}

	async saveDocument(rg: string, cpf: string, cnh: string): Promise<Document> {
		const result = await this._documentRepository.saveDocument(rg, cpf, cnh);
		return result;
	}
}
