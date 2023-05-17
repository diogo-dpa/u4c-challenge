import { Event } from "../config/entities/Event";
import { IEventRepository } from "../irepositories/IEventRepository";
import { DataSource, Repository } from "typeorm";
import { EVENT_NOT_FOUND_ERROR_MESSAGE } from "../utils/consts";
import { EventData } from "../utils/interfaces";

export class EventRepository implements IEventRepository {
	private _dbConnection: Repository<Event>;

	constructor(dbConnection: DataSource) {
		this._dbConnection = dbConnection.getRepository(Event);
	}
	public async getEvent(id: number): Promise<Event> {
		const eventsFound = await this._dbConnection.find({
			where: {
				id,
			},
			relations: {
				thirdPartyUser: true,
				address: true,
				client: true,
				vehicles: true,
				occurenceType: true,
			},
		});

		if (!eventsFound) throw new Error(EVENT_NOT_FOUND_ERROR_MESSAGE);

		return eventsFound.pop();
	}

	public async deleteEvent(id: number): Promise<void> {
		const eventFound = await this._dbConnection.findOneBy({
			id,
		});

		if (!eventFound) throw new Error(EVENT_NOT_FOUND_ERROR_MESSAGE);

		await this._dbConnection.remove(eventFound);
	}

	public async saveEvent(newEvent: Event): Promise<Event> {
		return await this._dbConnection.save(newEvent);
	}

	public async updateEvent(
		id: number,
		updatedEvent: EventData
	): Promise<Event> {
		const { occurenceCost, occurenceDate } = updatedEvent;

		const eventsFound = await this._dbConnection.find({
			where: {
				id,
			},
			relations: {
				thirdPartyUser: true,
				address: true,
				client: true,
				vehicles: true,
				occurenceType: true,
			},
		});

		if (!eventsFound) throw new Error(EVENT_NOT_FOUND_ERROR_MESSAGE);
		const eventFound = eventsFound.pop();
		console.log({ eventsFound });

		return await this._dbConnection.save({
			...eventFound,
			eventCost: occurenceCost ?? eventFound.eventCost,
			eventDate: occurenceDate ?? eventFound.eventDate,
		});
	}
}
