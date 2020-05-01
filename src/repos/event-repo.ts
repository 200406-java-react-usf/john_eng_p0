import { CrudRepository } from './crud-repo';
import eventData from '../data/event_db';
import { Event } from '../models/event';

import { PoolClient } from 'pg';
import { connectionPool } from '..';

export class EventRepository implements CrudRepository<Event>{

	async getAll(): Promise<Event[]> {

		let client:PoolClient;
		try{
			client = await connectionPool.connect();
			console.log(client);
			let sql = 'select * from app_events';
			let rs = await client.query(sql);
			console.log(rs);
			return rs.rows
		}catch(e){
			console.log(e);
			// throw new InternalServerError();
		}finally{
			client && client.release;
		}
		
	}
	getById(id: number): Promise<Event>{
		return new Promise<Event>((resolve,rejects)=>{
			console.log('id', typeof id);
			console.log('eventData[0]', typeof eventData[0].event_id)
			const event = {...eventData.find(event => event.event_id === id)}
			console.log('event', event);
			resolve(event);
		});
	}
	save(newObj: Event): Promise<Event>{
		return new Promise((resolve, rejects)=>{
			newObj.event_id = (eventData.length)+1
			eventData.push(newObj);
			resolve(newObj);
		});
	}
	update(updObj: Event): Promise<boolean>{
		return new Promise((resolve, rejects)=>{
			
			let persistedEvent = eventData.find((x)=>x.event_id === updObj.event_id)
			
			persistedEvent = updObj;
			
			resolve(true);
		});
	}
	deleteById(id: number): Promise<boolean>{
		return new Promise((resolve, rejects)=>{
			
			//find the index of the model and then use array method to delete it
			
			resolve(true);
		});
	}

}

