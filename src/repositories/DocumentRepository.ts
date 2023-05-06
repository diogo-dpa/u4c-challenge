import { Document } from "../entities/Document";
import { IDocumentRepository } from "../irepositories/IDocumentRepository";
import { DataSource, Repository } from "typeorm";

export class DocumentRepository implements IDocumentRepository {
	private _dbConnection: Repository<Document>;

	constructor(dbConnection: DataSource) {
		this._dbConnection = dbConnection.getRepository(Document);
	}

	async saveDocument(rg: string, cpf: string, cnh: string): Promise<Document> {
		const DocumentTeste = {
			rg,
			cpf,
			cnh,
			passport: "",
		} as any;
		const result = await this._dbConnection.save(DocumentTeste);
		return result;
	}
}
