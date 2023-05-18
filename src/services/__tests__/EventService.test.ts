jest.mock("../../repositories/UserRepository");
jest.mock("../../repositories/AddressRepository");
jest.mock("../../repositories/DocumentRepository");
jest.mock("../../repositories/VehicleRepository");
jest.mock("../../repositories/EventRepository");
jest.mock("../../config/database");

import { UserRepository } from "../../repositories/UserRepository";
import {
	USER_NOT_FOUND_ERROR_MESSAGE,
	VEHICLE_NOT_FOUND_ERROR_MESSAGE,
} from "../../utils/consts";
import { DataSource } from "typeorm";
import { DocumentRepository } from "../../repositories/DocumentRepository";
import { AddressRepository } from "../../repositories/AddressRepository";
import { VehicleRepository } from "../../repositories/VehicleRepository";
import { EventService } from "../EventService";
import { EventRepository } from "../../repositories/EventRepository";
import {
	idParamsInputMock,
	saveEventInputRequest,
	saveEventPostProcessedInput,
	successEventResponseFromDatabase,
	successGetDocumentResponseFromDatabase,
	successGetUserResponseFromDatabase,
	successGetVehicleResponseFromDatabase,
	successSaveThirdPartyUserResponseFromDataBase,
} from "../__mocks__/EventService.mock";

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

	const AddressRepositoryMock =
		AddressRepository as jest.Mock<AddressRepository>;
	const addressRepository = new AddressRepositoryMock(
		DataSourceMock
	) as jest.Mocked<AddressRepository>;

	const VehicleRepositoryMock =
		VehicleRepository as jest.Mock<VehicleRepository>;
	const vehicleRepository = new VehicleRepositoryMock(
		DataSourceMock
	) as jest.Mocked<VehicleRepository>;

	const EventRepositoryMock = EventRepository as jest.Mock<EventRepository>;
	const eventRepository = new EventRepositoryMock(
		DataSourceMock
	) as jest.Mocked<EventRepository>;

	const eventService = new EventService(
		eventRepository,
		vehicleRepository,
		userRepository,
		documentRepository,
		addressRepository
	);

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("getEvent", () => {
		it("should call the getEvent with the right parameters and return correctly", async () => {
			jest
				.spyOn(EventRepository.prototype, "getEvent")
				.mockResolvedValue(successEventResponseFromDatabase);

			const action = async () => {
				return await eventService.getEvent(idParamsInputMock);
			};

			const result = await action();

			expect(eventRepository.getEvent).toHaveBeenCalledTimes(1);
			expect(eventRepository.getEvent).toHaveBeenCalledWith(idParamsInputMock);
			expect(result).toEqual(successEventResponseFromDatabase);
		});
	});

	describe("deleteEvent", () => {
		beforeEach(() => {
			jest
				.spyOn(EventRepository.prototype, "getEvent")
				.mockResolvedValue(successEventResponseFromDatabase);
			jest
				.spyOn(AddressRepository.prototype, "deleteAddress")
				.mockResolvedValue(null);

			jest
				.spyOn(EventRepository.prototype, "deleteEvent")
				.mockResolvedValue(null);
		});

		it("should call the deleteAddress with the right parameters", async () => {
			const action = async () => {
				return await eventService.deleteEvent(idParamsInputMock);
			};

			await action();

			expect(addressRepository.deleteAddress).toHaveBeenCalledTimes(1);
			expect(addressRepository.deleteAddress).toHaveBeenCalledWith(
				successEventResponseFromDatabase.address.id
			);
		});

		it("should call the deleteEvent with the right parameters", async () => {
			const action = async () => {
				return await eventService.deleteEvent(idParamsInputMock);
			};

			await action();

			expect(eventRepository.deleteEvent).toHaveBeenCalledTimes(1);
			expect(eventRepository.deleteEvent).toHaveBeenCalledWith(
				idParamsInputMock
			);
		});
	});

	describe("saveEvent", () => {
		beforeEach(() => {
			jest
				.spyOn(EventRepository.prototype, "saveEvent")
				.mockResolvedValue(successEventResponseFromDatabase);
		});

		it("should return error when trying to get an user while creating an event", async () => {
			jest.spyOn(UserRepository.prototype, "getUser").mockResolvedValue(null);

			const action = async () => {
				await eventService.saveEvent(saveEventInputRequest);
			};

			await expect(action()).rejects.toThrow(USER_NOT_FOUND_ERROR_MESSAGE);
		});

		it("should return error when trying to get a vehicle while creating an event", async () => {
			jest
				.spyOn(UserRepository.prototype, "getUser")
				.mockResolvedValue(successGetUserResponseFromDatabase);

			jest
				.spyOn(VehicleRepository.prototype, "getVehicle")
				.mockResolvedValue(null);

			const action = async () => {
				await eventService.saveEvent(saveEventInputRequest);
			};

			await expect(action()).rejects.toThrow(VEHICLE_NOT_FOUND_ERROR_MESSAGE);
		});

		it("should call the method with the right parameters when the thirdPartyUser already exists in database as a client", async () => {
			jest
				.spyOn(UserRepository.prototype, "getUser")
				.mockResolvedValue(successGetUserResponseFromDatabase);

			jest
				.spyOn(VehicleRepository.prototype, "getVehicle")
				.mockResolvedValue(successGetVehicleResponseFromDatabase);

			jest
				.spyOn(DocumentRepository.prototype, "getDocumentByCPF")
				.mockResolvedValue(successGetDocumentResponseFromDatabase);

			jest
				.spyOn(UserRepository.prototype, "updateUser")
				.mockResolvedValue(successGetUserResponseFromDatabase);

			const action = async () => {
				return await eventService.saveEvent(saveEventInputRequest);
			};

			const result = await action();

			expect(userRepository.updateUser).toHaveBeenCalledTimes(1);
			expect(userRepository.updateUser).toHaveBeenCalledWith(
				successGetDocumentResponseFromDatabase.user.id,
				{
					isThirdPartyUser: false,
				}
			);

			expect(eventRepository.saveEvent).toHaveBeenCalledTimes(1);
			expect(eventRepository.saveEvent).toHaveBeenCalledWith(
				saveEventPostProcessedInput
			);
			expect(result).toEqual(successEventResponseFromDatabase);
		});

		it("should call the method with the right parameters when the thirdPartyUser doesn't exist in database", async () => {
			jest
				.spyOn(UserRepository.prototype, "getUser")
				.mockResolvedValue(successGetUserResponseFromDatabase);

			jest
				.spyOn(VehicleRepository.prototype, "getVehicle")
				.mockResolvedValue(successGetVehicleResponseFromDatabase);

			jest
				.spyOn(DocumentRepository.prototype, "getDocumentByCPF")
				.mockResolvedValue([] as any);

			jest
				.spyOn(DocumentRepository.prototype, "saveDocument")
				.mockResolvedValue(successGetDocumentResponseFromDatabase);

			jest
				.spyOn(UserRepository.prototype, "saveUser")
				.mockResolvedValue(successSaveThirdPartyUserResponseFromDataBase);

			const action = async () => {
				return await eventService.saveEvent(saveEventInputRequest);
			};

			const result = await action();

			saveEventPostProcessedInput.thirdPartyUser[0].isThirdPartyUser = true;

			expect(eventRepository.saveEvent).toHaveBeenCalledTimes(1);
			expect(eventRepository.saveEvent).toHaveBeenCalledWith(
				saveEventPostProcessedInput
			);
			expect(result).toEqual(successEventResponseFromDatabase);
		});
	});
});
