import { EventMemberRepository } from '../repos/eventMember-repo';
import { EventMember } from '../models/eventMember';
import { isValidId, 
	isValidStrings, 
	isValidObject, 
	isPropertyOf, 
	isEmptyObject } from '../util/validator'
import { ResourceNotFoundError, BadRequestError } from '../errors/errors';

export class EventMemberService{

	constructor(private eventMemberRepo: EventMemberRepository){
		this.eventMemberRepo = eventMemberRepo;
	}

	async getAllEventMember() : Promise<EventMember[]>{

		let result = await this.eventMemberRepo.getAll();

		if(isEmptyObject(result))
			throw new ResourceNotFoundError()

		return result;
	}

	async getEventMemberById(id: number) : Promise<EventMember[]> {

		if(!isValidId(id))
			throw new BadRequestError();

		let result = await this.eventMemberRepo.getById(id);

		if(isEmptyObject(result))
			throw new ResourceNotFoundError();

		return result;
	}

	async saveEventMember(newObj: EventMember) : Promise<EventMember> {

		if(!isValidObject(newObj, 'id'))
			throw new BadRequestError('Invalid property values found in provided events_members.');

		let result = await this.eventMemberRepo.save(newObj);
            
		return result;
	}

	async deleteEventMemberById(id: number, id2: number) : Promise<boolean> {

		if(!isValidId(id))
			throw new BadRequestError();

		let result = await this.eventMemberRepo.deleteById(id, id2);

		return result;

	}
}