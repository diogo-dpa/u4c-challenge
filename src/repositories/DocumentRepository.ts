import { Document } from "../config/entities/Document";
import { IDocumentRepository } from "../irepositories/IDocumentRepository";
import { DataSource, Repository } from "typeorm";
import { DOCUMENT_NOT_FOUND_ERROR_MESSAGE } from "../utils/consts";

export class DocumentRepository implements IDocumentRepository {
	private _dbConnection: Repository<Document>;

	constructor(dbConnection: DataSource) {
		this._dbConnection = dbConnection.getRepository(Document);
	}

	async deleteDocument(id: number): Promise<void> {
		const documentFound = await this._dbConnection.findOneBy({
			id,
		});

		if (!documentFound) throw new Error(DOCUMENT_NOT_FOUND_ERROR_MESSAGE);

		await this._dbConnection.remove(documentFound);
	}

	async saveDocument(
		rg: string,
		cpf: string,
		cnh: string,
		passport?: string
	): Promise<Document> {
		const DocumentTeste = {
			rg,
			cpf,
			cnh,
			passport: passport ?? "",
		} as any;
		return await this._dbConnection.save(DocumentTeste);
	}
}
