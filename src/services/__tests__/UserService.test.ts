jest.mock("../../repositories/UserRepository");
jest.mock("../../repositories/AddressRepository");
jest.mock("../../repositories/DocumentRepository");
jest.mock("../../config/database");

import { UserRepository } from "../../repositories/UserRepository";
import { UserService } from "../UserService";
import {
	FIELD_DOES_NOT_ALLOWED_UPDATE_ERROR_MESSAGE,
	INVALID_ADDRESS_ID_ERROR_MESSAGE,
	USER_NOT_FOUND_ERROR_MESSAGE,
} from "../../utils/consts";
import { DataSource } from "typeorm";
import { DocumentRepository } from "../../repositories/DocumentRepository";
import { DocumentService } from "../DocumentService";
import { AddressRepository } from "../../repositories/AddressRepository";
import { AddressService } from "../AddressService";
import {
	idParamsInputMock,
	successAddressResponseFromDataBaseUserTest,
	successDocumentResponseFromDataBaseUserTest,
	successUserResponseFromDataBase,
} from "../__mocks__/UserService.mock";

describe("UserService", () => {
	const DataSourceMock = DataSource as jest.Mock<DataSource>;

	const UserRepositoryMock = UserRepository as jest.Mock<UserRepository>;
	const userRepository = new UserRepositoryMock(
		DataSourceMock
	) as jest.Mocked<UserRepository>;

	const DocumentRepositoryMock =
		DocumentRepository as jest.Mock<DocumentRepository>;
	const documentRepository = new DocumentRepositoryMock(
		DataSourceMock
	) as jest.Mocked<DocumentRepository>;
	const documentService = new DocumentService(documentRepository);

	const AddressRepositoryMock =
		AddressRepository as jest.Mock<AddressRepository>;
	const addressRepository = new AddressRepositoryMock(
		DataSourceMock
	) as jest.Mocked<AddressRepository>;
	const addressService = new AddressService(addressRepository);

	const userService = new UserService(
		userRepository,
		documentService,
		addressService
	);

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("getUser", () => {
		it("should return error when trying to get an user that doesn't exists", async () => {
			jest.spyOn(UserRepository.prototype, "getUser").mockResolvedValue(null);

			const action = async () => {
				await userService.getUser(idParamsInputMock);
			};

			await expect(action()).rejects.toThrow(USER_NOT_FOUND_ERROR_MESSAGE);
		});

		it("should call the getUser with the right parameters and return correctly", async () => {
			jest
				.spyOn(UserRepository.prototype, "getUser")
				.mockResolvedValue(successUserResponseFromDataBase);

			const action = async () => {
				return await userService.getUser(idParamsInputMock);
			};

			const result = await action();

			expect(userRepository.getUser).toHaveBeenCalledTimes(1);
			expect(userRepository.getUser).toHaveBeenCalledWith(idParamsInputMock);
			expect(result).toEqual(successUserResponseFromDataBase);
		});
	});

	describe("deleteUser", () => {
		it("should call the deleteUser with the right parameters", async () => {
			jest
				.spyOn(UserRepository.prototype, "getUser")
				.mockResolvedValue(successUserResponseFromDataBase);
			const action = async () => {
				return await userService.deleteUser(idParamsInputMock);
			};

			await action();

			expect(userRepository.deleteUser).toHaveBeenCalledTimes(1);
			expect(userRepository.deleteUser).toHaveBeenCalledWith(idParamsInputMock);
		});

		it("should call the deleteDocument with the right parameters", async () => {
			jest
				.spyOn(UserRepository.prototype, "getUser")
				.mockResolvedValue(successUserResponseFromDataBase);

			const action = async () => {
				return await userService.deleteUser(idParamsInputMock);
			};

			await action();

			expect(documentRepository.deleteDocument).toHaveBeenCalledTimes(1);
			expect(documentRepository.deleteDocument).toHaveBeenCalledWith(
				successUserResponseFromDataBase.document.id
			);
		});

		it("should call the deleteAddress with the right parameters", async () => {
			jest
				.spyOn(UserRepository.prototype, "getUser")
				.mockResolvedValue(successUserResponseFromDataBase);

			const action = async () => {
				return await userService.deleteUser(idParamsInputMock);
			};

			await action();

			expect(addressRepository.deleteAddress).toHaveBeenCalledTimes(1);
			expect(addressRepository.deleteAddress).toHaveBeenCalledWith(
				successUserResponseFromDataBase.addresses[0].id
			);
		});
	});

	describe("saveUser", () => {
		beforeEach(() => {
			jest
				.spyOn(UserRepository.prototype, "saveUser")
				.mockResolvedValue(successUserResponseFromDataBase);
		});

		it("should call the method with the right parameters when the user doesn't exist in the database", async () => {
			jest
				.spyOn(DocumentRepository.prototype, "getDocumentByCPF")
				.mockResolvedValue(null);

			jest
				.spyOn(DocumentRepository.prototype, "saveDocument")
				.mockResolvedValue(successDocumentResponseFromDataBaseUserTest);

			const action = async () => {
				return await userService.saveUser(
					"João",
					"2000-05-17T00:00:00.440Z",
					"61 9999-9999",
					"joao@email.com",
					false,
					{
						cnh: "XXX",
						cpf: "YYY",
						rg: "WWW",
						passport: "LLL",
					},
					{
						street: "Avenida do Contorno",
						zipcode: "30123456",
						country: "Brazil",
						complement: "Near the bakery",
						number: 302,
						neighborhood: "Centro",
						state: "MG",
					}
				);
			};

			const result = await action();

			expect(userRepository.saveUser).toHaveBeenCalledTimes(1);
			expect(userRepository.saveUser).toHaveBeenCalledWith(
				"João",
				"2000-05-17T00:00:00.440Z",
				"61 9999-9999",
				"joao@email.com",
				false,
				{
					street: "Avenida do Contorno",
					zipcode: "30123456",
					country: "Brazil",
					complement: "Near the bakery",
					number: 302,
					neighborhood: "Centro",
					state: "MG",
				},
				successDocumentResponseFromDataBaseUserTest.id
			);
			expect(result).toEqual(successUserResponseFromDataBase);
		});

		it("should call the method with the right parameters when the user exists in the database", async () => {
			jest
				.spyOn(DocumentRepository.prototype, "getDocumentByCPF")
				.mockResolvedValue(successDocumentResponseFromDataBaseUserTest);

			jest
				.spyOn(DocumentRepository.prototype, "saveDocument")
				.mockResolvedValue(successDocumentResponseFromDataBaseUserTest);

			jest
				.spyOn(UserRepository.prototype, "updateUser")
				.mockResolvedValue(successUserResponseFromDataBase);

			const action = async () => {
				return await userService.saveUser(
					"João",
					"2000-05-17T00:00:00.440Z",
					"61 9999-9999",
					"joao@email.com",
					false,
					{
						cnh: "XXX",
						cpf: "YYY",
						rg: "WWW",
						passport: "LLL",
					},
					{
						street: "Avenida do Contorno",
						zipcode: "30123456",
						country: "Brazil",
						complement: "Near the bakery",
						number: 302,
						neighborhood: "Centro",
						state: "MG",
					}
				);
			};

			const result = await action();

			expect(userRepository.updateUser).toHaveBeenCalledTimes(1);
			expect(userRepository.updateUser).toHaveBeenCalledWith(
				successDocumentResponseFromDataBaseUserTest.user.id,
				{
					isThirdPartyUser: false,
				}
			);
			expect(result).toEqual(successUserResponseFromDataBase);
		});
	});

	describe("updateUser", () => {
		beforeEach(() => {
			jest
				.spyOn(UserRepository.prototype, "updateUser")
				.mockResolvedValue(successUserResponseFromDataBase);
		});

		it("should return error when trying to update the fullName of an user", async () => {
			const action = async () => {
				await userService.updateUser(1, {
					fullName: "João",
				} as any);
			};

			await expect(action()).rejects.toThrow(
				FIELD_DOES_NOT_ALLOWED_UPDATE_ERROR_MESSAGE
			);
		});

		it("should return error when trying to update the birthDate of an user", async () => {
			const action = async () => {
				await userService.updateUser(1, {
					birthDate: new Date("2000-05-17T00:00:00.440Z"),
				} as any);
			};

			await expect(action()).rejects.toThrow(
				FIELD_DOES_NOT_ALLOWED_UPDATE_ERROR_MESSAGE
			);
		});

		it("should return error when trying to update the address of an user without the id information", async () => {
			const action = async () => {
				await userService.updateUser(1, {
					email: "joao@email.com",
					addresses: [
						{
							id: null,
							street: "Avenida do Contorno",
						},
					],
				} as any);
			};

			await expect(action()).rejects.toThrow(INVALID_ADDRESS_ID_ERROR_MESSAGE);
		});

		it("should call the method with the right parameters", async () => {
			jest
				.spyOn(AddressRepository.prototype, "getAddress")
				.mockResolvedValue(successAddressResponseFromDataBaseUserTest);

			const action = async () => {
				return await userService.updateUser(idParamsInputMock, {
					email: "joao@email.com",
					addresses: [
						{
							id: idParamsInputMock,
							street: "Avenida do Contorno",
						},
					],
				} as any);
			};

			const result = await action();

			expect(addressRepository.getAddress).toHaveBeenCalledTimes(1);
			expect(addressRepository.getAddress).toHaveBeenCalledWith(
				idParamsInputMock
			);
			expect(userRepository.updateUser).toHaveBeenCalledTimes(1);
			expect(userRepository.updateUser).toHaveBeenCalledWith(
				idParamsInputMock,
				{
					email: "joao@email.com",
					addresses: [
						{
							id: idParamsInputMock,
							street: "Avenida do Contorno",
						},
					],
				}
			);
			expect(result).toEqual(successUserResponseFromDataBase);
		});
	});
});
