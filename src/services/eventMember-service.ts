import { EventMember } from '../models/eventMember';
import { EventMemberRepository } from '../repos/eventMember-repo';

export class EventMemberService{

	constructor(private eventMemberRepo: EventMemberRepository){
		this.eventMemberRepo = eventMemberRepo;
	}

	async getAllEventMember() : Promise<EventMember[]>{

			let result = await this.eventMemberRepo.getAll();

			return result;

	}
	async getEventMemberById(id: number) : Promise<EventMember> {

			let result = await this.eventMemberRepo.getById(id);

			return result;
	}

	async saveEventMember(newObj: EventMember) : Promise<EventMember> {
			let result = await this.eventMemberRepo.save(newObj);
            
			return result;
	}

	async updateEventMember(updObj: EventMember) : Promise<boolean> {
			await this.eventMemberRepo.update(updObj);
			return true;
	}

	async deleteEventMemberById(id: number, id2: number) : Promise<boolean> {

			await this.eventMemberRepo.deleteById(id, id2);

			return true;

	}
}