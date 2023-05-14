import { Event } from "../config/entities/Event";
import { IEventRepository } from "../irepositories/IEventRepository";
import { DataSource, Repository } from "typeorm";

export class EventRepository implements IEventRepository {
	private _dbConnection: Repository<Event>;

	constructor(dbConnection: DataSource) {
		this._dbConnection = dbConnection.getRepository(Event);
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
