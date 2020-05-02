import { Event } from '../models/event';
import { EventRepository } from '../repos/event-repo';

export class EventService{

	constructor(private eventRepo: EventRepository){
		this.eventRepo = eventRepo;
	}

	async getAllEvent() : Promise<Event[]>{

			let result = await this.eventRepo.getAll();

			return result;

	}
	async getEventById(id: number) : Promise<Event> {

			let result = await this.eventRepo.getById(id);

			return result;
	}

	async saveEvent(newObj: Event) : Promise<Event> {
			let result = await this.eventRepo.save(newObj);
            
			return result;
	}

	async updateEvent(updObj: Event) : Promise<boolean> {
			await this.eventRepo.update(updObj);
			return true;
	}

	async deleteEventById(id: number) : Promise<boolean> {

			await this.eventRepo.deleteById(id);

			return true;

	}
}