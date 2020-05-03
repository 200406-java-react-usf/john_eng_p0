import { Event } from '../models/event';
import { EventRepository } from '../repos/event-repo';
import { isValidId, 
		isValidStrings, 
		isValidObject, 
		isPropertyOf, 
		isEmptyObject } from '../util/validator'
import { ResourceNotFoundError, BadRequestError } from '../errors/errors';

export class EventService{

	constructor(private eventRepo: EventRepository){
		this.eventRepo = eventRepo;
	}

	async getAllEvent() : Promise<Event[]>{

		let result = await this.eventRepo.getAll();

		if(isEmptyObject(result))
			throw new ResourceNotFoundError()

		return result;

	}
	async getEventById(id: number) : Promise<Event> {

		if(!isValidId(id))
			throw new BadRequestError();

		let result = await this.eventRepo.getById(id);

		if(isEmptyObject(result))
			throw new ResourceNotFoundError();

		return result;
	}

	async saveEvent(newObj: Event) : Promise<Event> {

		if(!isValidObject(newObj, 'id'))
			throw new BadRequestError('Invalid property values found in provided user.');

		let result = await this.eventRepo.save(newObj);
		return result;
	}

	async updateEvent(updObj: Event) : Promise<boolean> {
		if(!isValidObject(updObj))
			throw new BadRequestError('Invalid user provided (invalid value found).');
		let result = await this.eventRepo.update(updObj);
		return result;
	}

	async deleteEventById(id: number) : Promise<boolean> {
		if(!isValidId(id))
			throw new BadRequestError();
		let result = await this.eventRepo.deleteById(id);
		return result;
	}
}