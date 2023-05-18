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
import { Address } from "../../config/entities/Address";

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

	const successResponseFromDataBase = {
		id: 1,
		createdAt: new Date("2023-05-17T23:27:55.440Z"),
		updatedAt: new Date("2023-05-17T23:27:55.440Z"),
		fullName: "João",
		birthDate: new Date("2000-05-17T00:00:00.440Z"),
		cellphone: "61 9999-9999",
		email: "joao@email.com",
		isThirdPartyUser: false,
		addresses: [
			{
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
		],
		document: {
			id: 1,
			createdAt: new Date("2023-05-17T23:27:55.440Z"),
			updatedAt: new Date("2023-05-17T23:27:55.440Z"),
			cnh: "XXX",
			cpf: "YYY",
			rg: "WWW",
			passport: "LLL",
		},
	};

	describe("getUser", () => {
		it("should return error when trying to get an user that doesn't exists", async () => {
			jest.spyOn(UserRepository.prototype, "getUser").mockResolvedValue(null);

			const action = async () => {
				await userService.getUser(2);
			};

			await expect(action()).rejects.toThrow(USER_NOT_FOUND_ERROR_MESSAGE);
		});

		it("should call the getUser with the right parameters and return correctly", async () => {
			jest
				.spyOn(UserRepository.prototype, "getUser")
				.mockResolvedValue(successResponseFromDataBase as any);

			const action = async () => {
				return await userService.getUser(1);
			};

			const result = await action();

			expect(userRepository.getUser).toHaveBeenCalledTimes(1);
			expect(userRepository.getUser).toHaveBeenCalledWith(1);
			expect(result).toEqual(successResponseFromDataBase);
		});
	});

	describe("deleteUser", () => {
		it("should call the deleteUser with the right parameters", async () => {
			jest
				.spyOn(UserRepository.prototype, "getUser")
				.mockResolvedValue(successResponseFromDataBase as any);
			const action = async () => {
				return await userService.deleteUser(1);
			};

			await action();

			expect(userRepository.deleteUser).toHaveBeenCalledTimes(1);
			expect(userRepository.deleteUser).toHaveBeenCalledWith(1);
		});

		it("should call the deleteDocument with the right parameters", async () => {
			jest
				.spyOn(UserRepository.prototype, "getUser")
				.mockResolvedValue(successResponseFromDataBase as any);

			const action = async () => {
				return await userService.deleteUser(1);
			};

			await action();

			expect(documentRepository.deleteDocument).toHaveBeenCalledTimes(1);
			expect(documentRepository.deleteDocument).toHaveBeenCalledWith(
				successResponseFromDataBase.document.id
			);
		});

		it("should call the deleteAddress with the right parameters", async () => {
			jest
				.spyOn(UserRepository.prototype, "getUser")
				.mockResolvedValue(successResponseFromDataBase as any);

			const action = async () => {
				return await userService.deleteUser(1);
			};

			await action();

			expect(addressRepository.deleteAddress).toHaveBeenCalledTimes(1);
			expect(addressRepository.deleteAddress).toHaveBeenCalledWith(
				successResponseFromDataBase.addresses[0].id
			);
		});
	});

	describe("saveUser", () => {
		const successResponseDocumentFromDataBase = {
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
				isThirdPartyUser: true,
				id: 1,
				addresses: [
					{
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
				],
				createdAt: new Date("2023-05-17T23:27:55.440Z"),
				updatedAt: new Date("2023-05-17T23:27:55.440Z"),
			},
		};
		beforeEach(() => {
			jest
				.spyOn(UserRepository.prototype, "saveUser")
				.mockResolvedValue(successResponseFromDataBase as any);
		});

		it("should call the method with the right parameters when the user doesn't exist in the database", async () => {
			jest
				.spyOn(DocumentRepository.prototype, "getDocumentByCPF")
				.mockResolvedValue(null);

			jest
				.spyOn(DocumentRepository.prototype, "saveDocument")
				.mockResolvedValue(successResponseDocumentFromDataBase as any);

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
				successResponseDocumentFromDataBase.id
			);
			expect(result).toEqual(successResponseFromDataBase);
		});

		it("should call the method with the right parameters when the user exists in the database", async () => {
			jest
				.spyOn(DocumentRepository.prototype, "getDocumentByCPF")
				.mockResolvedValue(successResponseDocumentFromDataBase as any);

			jest
				.spyOn(DocumentRepository.prototype, "saveDocument")
				.mockResolvedValue(successResponseDocumentFromDataBase as any);

			jest
				.spyOn(UserRepository.prototype, "updateUser")
				.mockResolvedValue(successResponseFromDataBase as any);

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
				successResponseDocumentFromDataBase.user.id,
				{
					isThirdPartyUser: false,
				}
			);
			expect(result).toEqual(successResponseFromDataBase);
		});
	});

	describe("updateUser", () => {
		beforeEach(() => {
			jest
				.spyOn(UserRepository.prototype, "updateUser")
				.mockResolvedValue(successResponseFromDataBase as any);
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
			const successResponseAddressFromDataBase = [
				{
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
			] as Address[];

			jest
				.spyOn(AddressRepository.prototype, "getAddress")
				.mockResolvedValue(successResponseAddressFromDataBase as any);

			const action = async () => {
				return await userService.updateUser(1, {
					email: "joao@email.com",
					addresses: [
						{
							id: 1,
							street: "Avenida do Contorno",
						},
					],
				} as any);
			};

			const result = await action();

			expect(addressRepository.getAddress).toHaveBeenCalledTimes(1);
			expect(addressRepository.getAddress).toHaveBeenCalledWith(1);
			expect(userRepository.updateUser).toHaveBeenCalledTimes(1);
			expect(userRepository.updateUser).toHaveBeenCalledWith(1, {
				email: "joao@email.com",
				addresses: [
					{
						id: 1,
						street: "Avenida do Contorno",
					},
				],
			});
			expect(result).toEqual(successResponseFromDataBase);
		});
	});
});
