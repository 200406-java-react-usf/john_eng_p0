import { Event } from '../models/event';
import { EventRepository } from '../repos/event-repo';

export class EventService{

	constructor(private eventRepo: EventRepository){
		this.eventRepo = eventRepo;
	}

	getAllEvent() : Promise<Event[]>{

		return new Promise<Event[]>(async (resolve,reject)=>{
			let events: Event[] = [];

			let result = await this.eventRepo.getAll();

			for(let event of result){
				events.push({...event});
			}

			resolve(result);


		});
	}
	getEventById(id: number) : Promise<Event> {
		return new Promise<Event>(async (resolve, reject)=>{

			let result = await this.eventRepo.getById(id);
			console.log('result', result);
			resolve(result);
		});
	}

	saveEvent(newObj: Event) : Promise<Event> {
		return new Promise<Event>(async (resolve, reject)=>{
			let result = {...await this.eventRepo.save(newObj)};
            
			resolve(result);
		});
	}

	updateEvent(updObj: Event) : Promise<boolean> {
		return new Promise<boolean>(async (resolve, reject)=>{
			await this.eventRepo.update(updObj);
			resolve(true);
		});
	}

	deleteEventById(id: number) : Promise<boolean> {
		return new Promise<boolean>(async (resolve, rejected) => {
			await this.eventRepo.deleteById(id);

			resolve(true);

		});
	}
}