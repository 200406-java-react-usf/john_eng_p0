import { CrudRepository } from './crud-repo';
import eventData from '../data/event_db';
import { Event } from '../models/event';

export class EventRepository implements CrudRepository<Event>{

	// private static instance: eventRepository;
	// private constructor(){}
	// static getInstance(){
	// 	return !EventRepository.instance ? EventRepository.instance = new EventRepository() : EventRepository.instance;
	// } 

	getAll(): Promise<Event[]> {

		return new Promise((resolve,reject)=> {

			let events = [];

			for(let event of eventData){
				events.push({...event});
			}

			resolve(events);
		});
	}
	getById(id: number): Promise<Event>{
		return new Promise((resolve,rejects)=>{
			
			let event = eventData.find((x)=>{x.event_id==id})
			resolve(event);
		});
	}
	save(newObj: Event): Promise<Event>{
		return new Promise((resolve, rejects)=>{
			resolve(eventData[0]);
		});
	}
	update(updObj: Event): Promise<boolean>{
		return new Promise((resolve, rejects)=>{
			resolve(true);
		});
	}
	deleteById(id: number): Promise<boolean>{
		return new Promise((resolve, rejects)=>{
			resolve(true);
		});
	}

}

