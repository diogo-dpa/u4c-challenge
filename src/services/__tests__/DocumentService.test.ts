jest.mock("../../repositories/DocumentRepository");
jest.mock("../../config/database");

import { DocumentRepository } from "../../repositories/DocumentRepository";
import { DocumentService } from "../DocumentService";
import { DataSource } from "typeorm";
import {
	idParamsInputMock,
	successDocumentResponseFromDatabase,
} from "../__mocks__/DocumentService.mock";

describe("DocumentService", () => {
	const DataSourceMock = DataSource as jest.Mock<DataSource>;

	const DocumentRepositoryMock =
		DocumentRepository as jest.Mock<DocumentRepository>;
	const documentRepository = new DocumentRepositoryMock(
		DataSourceMock
	) as jest.Mocked<DocumentRepository>;

	const documentService = new DocumentService(documentRepository);

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("getDocumentByCPF", () => {
		it("should call the getDocumentByCPF with the right parameters and return correctly", async () => {
			jest
				.spyOn(DocumentRepository.prototype, "getDocumentByCPF")
				.mockResolvedValue(successDocumentResponseFromDatabase);

			const action = async () => {
				return await documentService.getDocumentByCPF("XXX");
			};

			const result = await action();

			expect(documentRepository.getDocumentByCPF).toHaveBeenCalledTimes(1);
			expect(documentRepository.getDocumentByCPF).toHaveBeenCalledWith("XXX");
			expect(result).toEqual(successDocumentResponseFromDatabase);
		});
	});

	describe("deleteDocument", () => {
		it("should call the deleteDocument with the right parameters", async () => {
			const action = async () => {
				return await documentService.deleteDocument(idParamsInputMock);
			};

			await action();

			expect(documentRepository.deleteDocument).toHaveBeenCalledTimes(1);
			expect(documentRepository.deleteDocument).toHaveBeenCalledWith(
				idParamsInputMock
			);
		});
	});

	describe("saveDocument", () => {
		beforeEach(() => {
			jest
				.spyOn(DocumentRepository.prototype, "saveDocument")
				.mockResolvedValue(successDocumentResponseFromDatabase);
		});

		it("should call the method saveDocument with the right parameters", async () => {
			const action = async () => {
				return await documentService.saveDocument("XXX", "YYY", "WWW", "LLL");
			};

			const result = await action();

			expect(documentRepository.saveDocument).toHaveBeenCalledTimes(1);
			expect(documentRepository.saveDocument).toHaveBeenCalledWith(
				"XXX",
				"YYY",
				"WWW",
				"LLL"
			);
			expect(result).toEqual(successDocumentResponseFromDatabase);
		});
	});
});
