import { Event } from "../config/entities/Event";

export abstract class IEventRepository {
	public abstract saveEvent(
		type: string,
	): Promise<Event>;

    public abstract getAllEvent(): Promise<Event[]>;

    public abstract getEvent(
		id: number,
	): Promise<Event>;

    public abstract updateEvent(
		id: number,
        updatedEvent: Event,
	): Promise<Event>;

    public abstract deleteEvent(
		id: number,
	): Promise<Event>;
}
