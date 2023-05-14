import { Event } from "../config/entities/Event";
import { IEventService } from "../iservices/IEventService";
import { EventRepository } from "../repositories/EventRepository";

export class EventService implements IEventService {
	private _EventRepository: EventRepository;

	constructor(EventRepository: EventRepository) {
		this._EventRepository = EventRepository;
	}
    public saveEvent(type: string): Promise<Event> {
        throw new Error("Method not implemented.");
    }
    public getAllEvent(): Promise<Event[]> {
        throw new Error("Method not implemented.");
    }
    public updateEvent(id: number, updatedEvent: Event): Promise<Event> {
        throw new Error("Method not implemented.");
    }
	public getEvent(id: number): Promise<Event> {
		throw new Error("Method not implemented.");
	}
	public deleteEvent(id: number): Promise<Event> {
		throw new Error("Method not implemented.");
	}

}
