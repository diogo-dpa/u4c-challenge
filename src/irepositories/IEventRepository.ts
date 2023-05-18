import { Event } from "../config/entities/Event";
import { EventData } from "../utils/interfaces";

export abstract class IEventRepository {
	public abstract getEvent(id: number): Promise<Event>;
	public abstract deleteEvent(id: number): Promise<void>;
	public abstract saveEvent(newEvent: Event): Promise<Event>;
}
