import { CrudRepository } from './crud-repo';
import { EventMember } from '../models/eventMember';

import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapEventMemberResultSet } from '../util/result-set-mapper';
import { InternalServerError } from '../errors/errors';

export class EventMemberRepository implements CrudRepository<EventMember>{

	
	async getAll(): Promise<EventMember[]> {

		let client:PoolClient;
		try{
			client = await connectionPool.connect();
			console.log(client);
			let sql = 'select * from app_events_members';
			let rs = await client.query(sql);
			return rs.rows.map(mapEventMemberResultSet);
		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
		
	}
	async getById(id: number): Promise<EventMember[]>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = 'select * from app_events_members where event_id = $1';
			let rs = await client.query(sql, [id]);
			return rs.rows.map(mapEventMemberResultSet);
		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
	}

	async getByUniqueKey(key: string, val: string): Promise<EventMember> {

		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `select * from app_events_members where ${key} = $1`;
			let rs = await client.query(sql, [val]);
			return mapEventMemberResultSet(rs.rows[0]);
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}		
	}

	async save(newObj: EventMember): Promise<EventMember>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = `insert into app_events_members(event_id, member_id) values
			('${newObj.event_id}', '${newObj.member_id}');`;
			await client.query(sql);
			let sql2 = 'SELECT * FROM app_events_members WHERE event_id=(SELECT max(event_id) FROM app_events_members)';
			let rs = await client.query(sql2);
			return mapEventMemberResultSet(rs.rows[0]);
		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
	}

	async deleteById(event_id: number, member_id: number ): Promise<boolean>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = 'delete from app_events_members where event_id = $1 and member_id = $2';
			await client.query(sql, [event_id, member_id]);
			return true;
		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
	}
}
