import { CrudRepository } from './crud-repo';
import { EventMember } from '../models/eventMember';

import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapEventMemberResultSet } from '../util/result-set-mapper';

export class EventMemberRepository implements CrudRepository<EventMember>{

	
	async getAll(): Promise<EventMember[]> {

		let client:PoolClient;
		try{
			client = await connectionPool.connect();
			console.log(client);
			let sql = 'select * from app_events_members';
			let rs = await client.query(sql);
			console.log(rs.rows);
			return rs.rows.map(mapEventMemberResultSet);
		}catch(e){
			console.log(e);
			// throw new InternalServerError();
		}finally{
			client && client.release;
		}
		
	}
	async getById(id: number): Promise<EventMember>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = 'select * from app_events_members where eventMember_id = $1';
			let rs = await client.query(sql, [id]);
			return mapEventMemberResultSet(rs.rows[0]);
		}catch(e){
			console.log(e);
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
			console.log(e);
			// throw new InternalServerError();
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
			let rs = await client.query(sql);
			return mapEventMemberResultSet(rs.rows[0]);  //make getByUniqueKey
		}catch(e){
			console.log(e);
		}finally{
			client && client.release;
		}
	}
	async update(updObj: EventMember): Promise<boolean>{
		let client: PoolClient;
		try{
			// client = await connectionPool.connect();
			// let sql = 	`update app_events_members 
			// 			set event_id = '${updObj.event_id}', member_id = '${updObj.member_id}'
			// 			where event_id = $1 and member_id = $2`;
			// console.log(sql)
			// let rs = await client.query(sql, [updObj.event_id, updObj.member_id]);
			return true;

		}catch(e){
			console.log(e);
		}finally{
			client && client.release;
		}
	}

	async deleteById(event_id: number, member_id: number ): Promise<boolean>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = 'delete from app_events_members where event_id = $1 and member_id = $2';
			let rs = await client.query(sql, [event_id, member_id]);
			return true;
		}catch(e){
			console.log(e);
		}finally{
			client && client.release;
		}
	}
}
