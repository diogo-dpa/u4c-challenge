jest.mock("../../repositories/OccurenceTypeRepository");
jest.mock("../../config/database");

import { OccurenceTypeRepository } from "../../repositories/OccurenceTypeRepository";
import { OccurenceTypeService } from "../OccurenceTypeService";
import {
	OCCURENCE_TYPE_NOT_EXISTS_ERROR_MESSAGE,
	OCCURENCE_TYPE_NOT_FOUND_ERROR_MESSAGE,
} from "../../utils/consts";
import { DataSource } from "typeorm";

describe("OccurenceTypeService", () => {
	const DataSourceMock = DataSource as jest.Mock<DataSource>;

	const OccurenceTypeRepositoryMock =
		OccurenceTypeRepository as jest.Mock<OccurenceTypeRepository>;
	const occurenceTypeRepository = new OccurenceTypeRepositoryMock(
		DataSourceMock
	) as jest.Mocked<OccurenceTypeRepository>;

	const occurenceTypeService = new OccurenceTypeService(
		occurenceTypeRepository
	);

	afterEach(() => {
		jest.restoreAllMocks();
	});

	const successResponseFromDataBase = {
		id: 1,
		type: "Accident",
		createdAt: new Date("2023-05-17T23:27:55.440Z"),
		updatedAt: new Date("2023-05-17T23:27:55.440Z"),
	};

	describe("saveOccurenceType", () => {
		beforeEach(() => {
			jest
				.spyOn(OccurenceTypeRepository.prototype, "saveOccurenceType")
				.mockResolvedValue(successResponseFromDataBase);
		});

		it("should return error when the Occurence Type is wrong", async () => {
			const action = async () => {
				await occurenceTypeService.saveOccurenceType("aaa");
			};

			await expect(action()).rejects.toThrow(
				OCCURENCE_TYPE_NOT_EXISTS_ERROR_MESSAGE
			);
		});

		it("should call the method with the right parameters", async () => {
			const action = async () => {
				return await occurenceTypeService.saveOccurenceType("Accident");
			};

			const result = await action();

			expect(occurenceTypeRepository.saveOccurenceType).toHaveBeenCalledTimes(
				1
			);
			expect(occurenceTypeRepository.saveOccurenceType).toHaveBeenCalledWith(
				"Accident"
			);
			expect(result).toEqual(successResponseFromDataBase);
		});
	});

	describe("getOccurenceType", () => {
		it("should return error when trying to get an occurence type that doesn't exists", async () => {
			jest
				.spyOn(OccurenceTypeRepository.prototype, "getOccurenceType")
				.mockResolvedValue(null);

			const action = async () => {
				await occurenceTypeService.getOccurenceType(2);
			};

			await expect(action()).rejects.toThrow(
				OCCURENCE_TYPE_NOT_FOUND_ERROR_MESSAGE
			);
		});

		it("should call the getOccurenceType with the right parameters and return correctly", async () => {
			jest
				.spyOn(OccurenceTypeRepository.prototype, "getOccurenceType")
				.mockResolvedValue(successResponseFromDataBase);

			const action = async () => {
				return await occurenceTypeService.getOccurenceType(1);
			};

			const result = await action();

			expect(occurenceTypeRepository.getOccurenceType).toHaveBeenCalledTimes(1);
			expect(occurenceTypeRepository.getOccurenceType).toHaveBeenCalledWith(1);
			expect(result).toEqual(successResponseFromDataBase);
		});
	});

	describe("deleteOccurenceType", () => {
		it("should call the deleteOccurenceType with the right parameters", async () => {
			const action = async () => {
				return await occurenceTypeService.deleteOccurenceType(1);
			};

			await action();

			expect(occurenceTypeRepository.deleteOccurenceType).toHaveBeenCalledTimes(
				1
			);
			expect(occurenceTypeRepository.deleteOccurenceType).toHaveBeenCalledWith(
				1
			);
		});
	});
});
