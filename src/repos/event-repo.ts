import { CrudRepository } from './crud-repo';
import { Event } from '../models/event';

import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapEventResultSet } from '../util/result-set-mapper';
import { InternalServerError } from '../errors/errors';

export class EventRepository implements CrudRepository<Event>{

	
	async getAll(): Promise<Event[]> {

		let client:PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = 'select * from app_events';
			let rs = await client.query(sql);
			return rs.rows.map(mapEventResultSet);
		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
		
	}
	async getById(id: number): Promise<Event>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = 'select * from app_events where event_id = $1';
			let rs = await client.query(sql, [id]);
			return mapEventResultSet(rs.rows[0]);
		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
	}

	async getByUniqueKey(key: string, val: string): Promise<Event> {

		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `select * from app_events where ${key} = $1`;
			let rs = await client.query(sql, [val]);
			return mapEventResultSet(rs.rows[0]);
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}		
	}

	async save(newObj: Event): Promise<Event>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = `insert into app_events(title, time_begin, time_end, notes, address_id, host_id) values
			('${newObj.title}', '${newObj.time_begin}', '${newObj.time_end}', '${newObj.notes}', '${newObj.address_id}', '${newObj.host_id}')`;
			await client.query(sql);
			let sql2 = 'SELECT * FROM app_events WHERE event_id=(SELECT max(event_id) FROM app_events)';
			let rs = await client.query(sql2);
			return mapEventResultSet(rs.rows[0]);

		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
	}
	async update(updObj: Event): Promise<boolean>{

		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = 	`update app_events 
						set title = '${updObj.title}', time_begin = '${updObj.time_begin}', time_end = '${updObj.time_end}', notes = '${updObj.notes}', address_id = '${updObj.address_id}', host_id = '${updObj.host_id}'
						where event_id = $1`;
			await client.query(sql, [updObj.event_id]);

			// if(!isEmptyObject(await this.getById(updObj.event_id)))
			return true;

		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
	}

	async deleteById(id: number): Promise<boolean>{

		let client: PoolClient;

		try{
			client = await connectionPool.connect();
			let sql = 'delete from app_events where event_id = $1';
			let rs = await client.query(sql, [id]);
			return true;
		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
	}
}
