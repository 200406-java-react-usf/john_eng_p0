import { CrudRepository } from './crud-repo';
import eventData from '../data/event_db';
import { Event } from '../models/event';

import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapEventResultSet } from '../util/result-set-mapper';

export class EventRepository implements CrudRepository<Event>{

	
	async getAll(): Promise<Event[]> {

		let client:PoolClient;
		try{
			client = await connectionPool.connect();
			console.log(client);
			let sql = 'select * from app_events';
			let rs = await client.query(sql);
			return rs.rows.map(mapEventResultSet);
		}catch(e){
			console.log(e);
			// throw new InternalServerError();
		}finally{
			client && client.release;
		}
		
	}
	async getById(id: number): Promise<Event>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = `select * from app_events where event_id = $1`;
			let rs = await client.query(sql, [id]);
			return mapEventResultSet(rs.rows[0]);
		}catch(e){
			console.log(e);
		}finally{
			client && client.release;
		}


	}
	async save(newObj: Event): Promise<Event>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = `insert into app_events(title, time_begin, time_end, notes, address_id, host_id) values
			('${newObj.title}', '${newObj.time_begin}', '${newObj.time_end}', '${newObj.notes}', '${newObj.address_id}', '${newObj.host_id}')`
			let rs = await client.query(sql);
			return mapEventResultSet(rs.rows[0]);  //make getByUniqueKey
		}catch(e){
			console.log(e);
		}finally{
			client && client.release;
		}
	}
	update(updObj: Event): Promise<boolean>{
		return new Promise((resolve, rejects)=>{
			
			let persistedEvent = eventData.find((x)=>x.event_id === updObj.event_id);
			
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

