import { Event } from "../config/entities/Event";

export abstract class IEventRepository {
	public abstract getEvent(id: number): Promise<Event>;
	public abstract deleteEvent(id: number): Promise<void>;
	public abstract saveEvent(newEvent: Event): Promise<Event>;
	public abstract updateEvent(id: number, updatedEvent: Event): Promise<Event>;
}
