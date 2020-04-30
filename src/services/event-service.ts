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


        })
        
    }
}