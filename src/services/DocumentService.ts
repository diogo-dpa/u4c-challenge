import { Document } from "../config/entities/Document";
import { IDocumentService } from "../iservices/IDocumentService";
import { DocumentRepository } from "../repositories/DocumentRepository";

export class DocumentService implements IDocumentService {
	private _documentRepository: DocumentRepository;

	constructor(documentRepository: DocumentRepository) {
		this._documentRepository = documentRepository;
	}
	public async getDocumentByCPF(cpf: string): Promise<Document> {
		return await this._documentRepository.getDocumentByCPF(cpf);
	}

	public async deleteDocument(id: number): Promise<void> {
		await this._documentRepository.deleteDocument(id);
	}

	async saveDocument(
		rg: string,
		cpf: string,
		cnh: string,
		passport?: string
	): Promise<Document> {
		const result = await this._documentRepository.saveDocument(
			rg,
			cpf,
			cnh,
			passport
		);
		return result;
	}
}
