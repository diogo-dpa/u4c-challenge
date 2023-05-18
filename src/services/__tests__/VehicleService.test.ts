jest.mock("../../repositories/VehicleRepository");
jest.mock("../../config/database");

import { VehicleRepository } from "../../repositories/VehicleRepository";
import { VehicleService } from "../VehicleService";
import {
	FIELD_DOES_NOT_ALLOWED_UPDATE_ERROR_MESSAGE,
	VEHICLE_NOT_FOUND_ERROR_MESSAGE,
} from "../../utils/consts";
import { DataSource } from "typeorm";
import { Vehicle } from "../../config/entities/Vehicle";

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

	const successResponseFromDataBase = {
		id: 1,
		createdAt: new Date("2023-05-17T23:27:55.440Z"),
		updatedAt: new Date("2023-05-17T23:27:55.440Z"),
		brand: "Fiat",
		model: "Uno",
		mileage: 40000,
		chassis: "XXX",
		fabricationYear: 2009,
		modelYear: 2009,
		plate: "XXX1111",
	} as Vehicle;

	describe("getVehicle", () => {
		it("should return error when trying to get an vehicle that doesn't exists", async () => {
			jest
				.spyOn(VehicleRepository.prototype, "getVehicle")
				.mockResolvedValue(null);

			const action = async () => {
				await vehicleService.getVehicle(2);
			};

			await expect(action()).rejects.toThrow(VEHICLE_NOT_FOUND_ERROR_MESSAGE);
		});

		it("should call the getVehicle with the right parameters and return correctly", async () => {
			jest
				.spyOn(VehicleRepository.prototype, "getVehicle")
				.mockResolvedValue(successResponseFromDataBase);

			const action = async () => {
				return await vehicleService.getVehicle(1);
			};

			const result = await action();

			expect(vehicleRepository.getVehicle).toHaveBeenCalledTimes(1);
			expect(vehicleRepository.getVehicle).toHaveBeenCalledWith(1);
			expect(result).toEqual(successResponseFromDataBase);
		});
	});

	describe("deleteVehicle", () => {
		it("should call the deleteVehicle with the right parameters", async () => {
			const action = async () => {
				return await vehicleService.deleteVehicle(1);
			};

			await action();

			expect(vehicleRepository.deleteVehicle).toHaveBeenCalledTimes(1);
			expect(vehicleRepository.deleteVehicle).toHaveBeenCalledWith(1);
		});
	});

	describe("saveVehicle", () => {
		beforeEach(() => {
			jest
				.spyOn(VehicleRepository.prototype, "saveVehicle")
				.mockResolvedValue(successResponseFromDataBase);
		});

		it("should call the method with the right parameters", async () => {
			const action = async () => {
				return await vehicleService.saveVehicle({
					brand: "Fiat",
					model: "Uno",
					mileage: 40000,
					chassis: "XXX",
					fabricationYear: 2009,
					modelYear: 2009,
					plate: "XXX1111",
				} as any);
			};

			const result = await action();

			expect(vehicleRepository.saveVehicle).toHaveBeenCalledTimes(1);
			expect(vehicleRepository.saveVehicle).toHaveBeenCalledWith({
				brand: "Fiat",
				model: "Uno",
				mileage: 40000,
				chassis: "XXX",
				fabricationYear: 2009,
				modelYear: 2009,
				plate: "XXX1111",
			});
			expect(result).toEqual(successResponseFromDataBase);
		});
	});

	describe("updateVehicle", () => {
		beforeEach(() => {
			jest
				.spyOn(VehicleRepository.prototype, "updateVehicle")
				.mockResolvedValue(successResponseFromDataBase);
		});

		it("should return error when trying to get an vehicle that doesn't exists", async () => {
			const action = async () => {
				await vehicleService.updateVehicle(1, {
					brand: "Fiat",
					model: "Uno",
					mileage: 40000,
					chassis: "XXX",
					fabricationYear: 2009,
					modelYear: 2009,
					plate: "XXX1111",
				} as any);
			};

			await expect(action()).rejects.toThrow(
				FIELD_DOES_NOT_ALLOWED_UPDATE_ERROR_MESSAGE
			);
		});

		it("should call the method with the right parameters", async () => {
			const action = async () => {
				return await vehicleService.updateVehicle(1, {
					mileage: 40000,
				} as any);
			};

			const result = await action();

			expect(vehicleRepository.updateVehicle).toHaveBeenCalledTimes(1);
			expect(vehicleRepository.updateVehicle).toHaveBeenCalledWith(1, {
				mileage: 40000,
			});
			expect(result).toEqual(successResponseFromDataBase);
		});
	});
});
