import { Event } from "../config/entities/Event";
import { IEventService } from "../iservices/IEventService";
import { EventRepository } from "../repositories/EventRepository";

export class EventService implements IEventService {
	private _eventRepository: EventRepository;

	constructor(EventRepository: EventRepository) {
		this._eventRepository = EventRepository;
	}
	public async getEvent(id: number): Promise<Event> {
		return await this._eventRepository.getEvent(id);
	}

	public async deleteEvent(id: number): Promise<void> {
		await this._eventRepository.deleteEvent(id);
	}

	public async saveEvent(newEvent: Event): Promise<Event> {
		return await this._eventRepository.saveEvent(newEvent);
	}

	public async updateEvent(id: number, updatedEvent: Event): Promise<Event> {
		return await this._eventRepository.updateEvent(id, updatedEvent);
	}
}
