jest.mock("../../repositories/VehicleRepository");
jest.mock("../../config/database");

import { VehicleRepository } from "../../repositories/VehicleRepository";
import { VehicleService } from "../VehicleService";
import {
	FIELD_DOES_NOT_ALLOWED_UPDATE_ERROR_MESSAGE,
	VEHICLE_NOT_FOUND_ERROR_MESSAGE,
} from "../../utils/consts";
import { DataSource } from "typeorm";
import {
	idParamsInputMock,
	saveVehicleInputRequest,
	successVehicleResponseFromDataBase,
} from "../__mocks__/VehicleService.mock";

describe("VehicleService", () => {
	const DataSourceMock = DataSource as jest.Mock<DataSource>;

	const VehicleRepositoryMock =
		VehicleRepository as jest.Mock<VehicleRepository>;
	const vehicleRepository = new VehicleRepositoryMock(
		DataSourceMock
	) as jest.Mocked<VehicleRepository>;

	const vehicleService = new VehicleService(vehicleRepository);

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("getVehicle", () => {
		it("should return error when trying to get an vehicle that doesn't exists", async () => {
			jest
				.spyOn(VehicleRepository.prototype, "getVehicle")
				.mockResolvedValue(null);

			const action = async () => {
				await vehicleService.getVehicle(idParamsInputMock);
			};

			await expect(action()).rejects.toThrow(VEHICLE_NOT_FOUND_ERROR_MESSAGE);
		});

		it("should call the getVehicle with the right parameters and return correctly", async () => {
			jest
				.spyOn(VehicleRepository.prototype, "getVehicle")
				.mockResolvedValue(successVehicleResponseFromDataBase);

			const action = async () => {
				return await vehicleService.getVehicle(idParamsInputMock);
			};

			const result = await action();

			expect(vehicleRepository.getVehicle).toHaveBeenCalledTimes(1);
			expect(vehicleRepository.getVehicle).toHaveBeenCalledWith(
				idParamsInputMock
			);
			expect(result).toEqual(successVehicleResponseFromDataBase);
		});
	});

	describe("deleteVehicle", () => {
		it("should call the deleteVehicle with the right parameters", async () => {
			const action = async () => {
				return await vehicleService.deleteVehicle(idParamsInputMock);
			};

			await action();

			expect(vehicleRepository.deleteVehicle).toHaveBeenCalledTimes(1);
			expect(vehicleRepository.deleteVehicle).toHaveBeenCalledWith(
				idParamsInputMock
			);
		});
	});

	describe("saveVehicle", () => {
		beforeEach(() => {
			jest
				.spyOn(VehicleRepository.prototype, "saveVehicle")
				.mockResolvedValue(successVehicleResponseFromDataBase);
		});

		it("should call the method with the right parameters", async () => {
			const action = async () => {
				return await vehicleService.saveVehicle(saveVehicleInputRequest);
			};

			const result = await action();

			expect(vehicleRepository.saveVehicle).toHaveBeenCalledTimes(1);
			expect(vehicleRepository.saveVehicle).toHaveBeenCalledWith(
				saveVehicleInputRequest
			);
			expect(result).toEqual(successVehicleResponseFromDataBase);
		});
	});

	describe("updateVehicle", () => {
		beforeEach(() => {
			jest
				.spyOn(VehicleRepository.prototype, "updateVehicle")
				.mockResolvedValue(successVehicleResponseFromDataBase);
		});

		it("should return error when trying to get an vehicle that doesn't exists", async () => {
			const action = async () => {
				await vehicleService.updateVehicle(1, saveVehicleInputRequest);
			};

			await expect(action()).rejects.toThrow(
				FIELD_DOES_NOT_ALLOWED_UPDATE_ERROR_MESSAGE
			);
		});

		it("should call the method with the right parameters", async () => {
			const action = async () => {
				return await vehicleService.updateVehicle(idParamsInputMock, {
					mileage: 40000,
				} as any);
			};

			const result = await action();

			expect(vehicleRepository.updateVehicle).toHaveBeenCalledTimes(1);
			expect(vehicleRepository.updateVehicle).toHaveBeenCalledWith(
				idParamsInputMock,
				{
					mileage: 40000,
				}
			);
			expect(result).toEqual(successVehicleResponseFromDataBase);
		});
	});
});
