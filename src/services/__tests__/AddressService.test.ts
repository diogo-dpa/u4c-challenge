jest.mock("../../repositories/AddressRepository");
jest.mock("../../config/database");

import { AddressRepository } from "../../repositories/AddressRepository";
import { AddressService } from "../AddressService";
import { DataSource } from "typeorm";
import { Address } from "../../config/entities/Address";

describe("AddressService", () => {
	const DataSourceMock = DataSource as jest.Mock<DataSource>;

	const AddressRepositoryMock =
		AddressRepository as jest.Mock<AddressRepository>;
	const addressRepository = new AddressRepositoryMock(
		DataSourceMock
	) as jest.Mocked<AddressRepository>;
	const addressService = new AddressService(addressRepository);

	afterEach(() => {
		jest.restoreAllMocks();
	});

	const successResponseFromDataBase = {
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
	} as Address;

	describe("getAddress", () => {
		it("should call the getOccurenceType with the right parameters and return correctly", async () => {
			jest
				.spyOn(AddressRepository.prototype, "getAddress")
				.mockResolvedValue(successResponseFromDataBase);

			const action = async () => {
				return await addressService.getAddress(1);
			};

			const result = await action();

			expect(addressRepository.getAddress).toHaveBeenCalledTimes(1);
			expect(addressRepository.getAddress).toHaveBeenCalledWith(1);
			expect(result).toEqual(successResponseFromDataBase);
		});
	});

	describe("deleteAddress", () => {
		it("should call the deleteAddress with the right parameters", async () => {
			const action = async () => {
				return await addressService.deleteAddress(1);
			};

			await action();

			expect(addressRepository.deleteAddress).toHaveBeenCalledTimes(1);
			expect(addressRepository.deleteAddress).toHaveBeenCalledWith(1);
		});
	});

	describe("saveAddress", () => {
		beforeEach(() => {
			jest
				.spyOn(AddressRepository.prototype, "saveAddress")
				.mockResolvedValue(successResponseFromDataBase);
		});

		it("should call the method with the right parameters", async () => {
			const action = async () => {
				return await addressService.saveAddress(
					"30123456",
					"Avenida do Contorno",
					302,
					"MG",
					"Brazil",
					"Centro",
					"Near the bakery"
				);
			};

			const result = await action();

			expect(addressRepository.saveAddress).toHaveBeenCalledTimes(1);
			expect(addressRepository.saveAddress).toHaveBeenCalledWith(
				"30123456",
				"Avenida do Contorno",
				302,
				"MG",
				"Brazil",
				"Centro",
				"Near the bakery"
			);
			expect(result).toEqual(successResponseFromDataBase);
		});
	});
});
