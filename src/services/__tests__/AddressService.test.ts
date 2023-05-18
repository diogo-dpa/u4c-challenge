jest.mock("../../repositories/AddressRepository");
jest.mock("../../config/database");

import { AddressRepository } from "../../repositories/AddressRepository";
import { AddressService } from "../AddressService";
import { DataSource } from "typeorm";
import {
	idParamsInputMock,
	successAddressResponseFromDatabase,
} from "../__mocks__/AddressService.mock";

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

	describe("getAddress", () => {
		it("should call the getAddress with the right parameters and return correctly", async () => {
			jest
				.spyOn(AddressRepository.prototype, "getAddress")
				.mockResolvedValue(successAddressResponseFromDatabase);

			const action = async () => {
				return await addressService.getAddress(idParamsInputMock);
			};

			const result = await action();

			expect(addressRepository.getAddress).toHaveBeenCalledTimes(1);
			expect(addressRepository.getAddress).toHaveBeenCalledWith(
				idParamsInputMock
			);
			expect(result).toEqual(successAddressResponseFromDatabase);
		});
	});

	describe("deleteAddress", () => {
		it("should call the deleteAddress with the right parameters", async () => {
			const action = async () => {
				return await addressService.deleteAddress(idParamsInputMock);
			};

			await action();

			expect(addressRepository.deleteAddress).toHaveBeenCalledTimes(1);
			expect(addressRepository.deleteAddress).toHaveBeenCalledWith(
				idParamsInputMock
			);
		});
	});

	describe("saveAddress", () => {
		beforeEach(() => {
			jest
				.spyOn(AddressRepository.prototype, "saveAddress")
				.mockResolvedValue(successAddressResponseFromDatabase);
		});

		it("should call the method saveAddress with the right parameters", async () => {
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
			expect(result).toEqual(successAddressResponseFromDatabase);
		});
	});
});
