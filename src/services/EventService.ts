import { Event } from "../config/entities/Event";
import { IEventService } from "../iservices/IEventService";
import { AddressRepository } from "../repositories/AddressRepository";
import { DocumentRepository } from "../repositories/DocumentRepository";
import { EventRepository } from "../repositories/EventRepository";
import { UserRepository } from "../repositories/UserRepository";
import { VehicleRepository } from "../repositories/VehicleRepository";
import { EventData } from "../utils/interfaces";

export class EventService implements IEventService {
	private _eventRepository: EventRepository;
	private _vehicleRepository: VehicleRepository;
	private _userRepository: UserRepository;
	private _documentRepository: DocumentRepository;
	private _addressRepository: AddressRepository;

	constructor(
		eventRepository: EventRepository,
		vehicleRepository: VehicleRepository,
		userRepository: UserRepository,
		documentRepository: DocumentRepository,
		addressRepository: AddressRepository
	) {
		this._eventRepository = eventRepository;
		this._vehicleRepository = vehicleRepository;
		this._userRepository = userRepository;
		this._documentRepository = documentRepository;
		this._addressRepository = addressRepository;
	}
	public async getEvent(id: number): Promise<Event> {
		return await this._eventRepository.getEvent(id);
	}

	public async deleteEvent(id: number): Promise<void> {
		const eventFound = await this._eventRepository.getEvent(id);

		await this._addressRepository.deleteAddress(eventFound.address.id);

		await this._eventRepository.deleteEvent(id);
	}

	public async saveEvent(newEvent: EventData): Promise<Event> {
		const { clientId, vehicleId, thirdPartyUser } = newEvent;

		const userFound = await this._userRepository.getUser(clientId);
		const vehicleFound = await this._vehicleRepository.getVehicle(vehicleId);

		const documentsToAdd = thirdPartyUser.map((x) => x.documents);

		const documentPromises = documentsToAdd.map((x) => {
			const { cnh, cpf, rg, passport } = x;

			return this._documentRepository.saveDocument(cnh, cpf, rg, passport);
		});

		const documentPromisesResult = await Promise.all([...documentPromises]);

		const thirdPartyUserCreatedPromises = thirdPartyUser.map((x, index) => {
			return this._userRepository.saveUser(
				x.fullName,
				x.birthDate as any,
				x.email,
				x.cellphone,
				true,
				x.address,
				documentPromisesResult[index].id
			);
		});

		const thirdPartyUserPromisesResult = await Promise.all([
			...thirdPartyUserCreatedPromises,
		]);

		const updatedThirdPartyUser = thirdPartyUserPromisesResult.map((trp) => ({
			...trp,
			isThirdPartyUser: true,
		}));

		const newEventData = {
			client: [userFound],
			vehicles: [vehicleFound],
			occurenceType: newEvent.occurenceType,
			eventDate: newEvent.occurenceDate,
			eventCost: newEvent.occurenceCost,
			address: newEvent.address,
		};

		return await this._eventRepository.saveEvent({
			...newEventData,
			thirdPartyUser: updatedThirdPartyUser,
		} as any);
	}

	public async updateEvent(
		id: number,
		updatedEvent: EventData
	): Promise<Event> {
		return await this._eventRepository.updateEvent(id, updatedEvent);
	}
}
