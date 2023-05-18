jest.mock("../../repositories/DocumentRepository");
jest.mock("../../config/database");

import { DocumentRepository } from "../../repositories/DocumentRepository";
import { DocumentService } from "../DocumentService";
import { DataSource } from "typeorm";

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

	const successResponseFromDataBase = {
		id: 1,
		createdAt: new Date("2023-05-17T23:27:55.440Z"),
		updatedAt: new Date("2023-05-17T23:27:55.440Z"),
		cnh: "XXX",
		cpf: "YYY",
		rg: "WWW",
		passport: "LLL",
		user: {
			fullName: "João",
			birthDate: new Date("2000-05-17T00:00:00.440Z"),
			cellphone: "61 9999-9999",
			email: "joao@email.com",
			isThirdPartyUser: false,
			id: 1,
			addresses: {
				id: 1,
				createdAt: new Date("2023-05-17T23:27:55.440Z"),
				updatedAt: new Date("2023-05-17T23:27:55.440Z"),
				street: "Avenida do Contorno",
				zipcode: "30123456",
				country: "Brazil",
				complement: "Near the bakery",
				number: 302,
				neighborhood: "Centro",
				state: "MG",
			},
			createdAt: new Date("2023-05-17T23:27:55.440Z"),
			updatedAt: new Date("2023-05-17T23:27:55.440Z"),
		},
	};

	describe("getDocumentByCPF", () => {
		it("should call the getDocumentByCPF with the right parameters and return correctly", async () => {
			jest
				.spyOn(DocumentRepository.prototype, "getDocumentByCPF")
				.mockResolvedValue(successResponseFromDataBase as any);

			const action = async () => {
				return await documentService.getDocumentByCPF("XXX");
			};

			const result = await action();

			expect(documentRepository.getDocumentByCPF).toHaveBeenCalledTimes(1);
			expect(documentRepository.getDocumentByCPF).toHaveBeenCalledWith("XXX");
			expect(result).toEqual(successResponseFromDataBase);
		});
	});

	describe("deleteDocument", () => {
		it("should call the deleteDocument with the right parameters", async () => {
			const action = async () => {
				return await documentService.deleteDocument(1);
			};

			await action();

			expect(documentRepository.deleteDocument).toHaveBeenCalledTimes(1);
			expect(documentRepository.deleteDocument).toHaveBeenCalledWith(1);
		});
	});

	describe("saveDocument", () => {
		beforeEach(() => {
			jest
				.spyOn(DocumentRepository.prototype, "saveDocument")
				.mockResolvedValue(successResponseFromDataBase as any);
		});

		it("should call the method with the right parameters", async () => {
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
			expect(result).toEqual(successResponseFromDataBase);
		});
	});
});
