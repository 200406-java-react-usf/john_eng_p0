import { CrudRepository } from './crud-repo';
import { Member } from '../models/member';

import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapMemberResultSet } from '../util/result-set-mapper';
import { InternalServerError } from '../errors/errors';

export class MemberRepository implements CrudRepository<Member>{


	async getAll(): Promise<Member[]> {

		let client: PoolClient;
		
		try{
			client = await connectionPool.connect();
			let sql = 'select * from app_members;';
			let rs = await client.query(sql);
			return rs.rows.map(mapMemberResultSet);
		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;

		}


	}
	async getById(id: number): Promise<Member>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = 'select * from app_members where member_id = $1';
			let rs = await client.query(sql, [id]);
			return mapMemberResultSet(rs.rows[0]);
		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
	}

	async getByUniqueKey(key: string, val: string): Promise<Member> {

		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `select * from app_members where ${key} = $1`;
			let rs = await client.query(sql, [val]);
			return mapMemberResultSet(rs.rows[0]);
		} catch (e) {
			console.log(e);
			throw new InternalServerError();
		} finally {
			client && client.release();
		}		
	}

	async save(newObj: Member): Promise<Member>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = `insert into app_members(first_name, last_name, biography, email, telephone) values
			('${newObj.first_name}', '${newObj.last_name}', '${newObj.biography}', '${newObj.email}', '${newObj.telephone}')`;
			await client.query(sql);
			let sql2 = 'SELECT * FROM app_events WHERE member_id=(SELECT max(member_id) FROM app_members)';
			let rs = await client.query(sql2);
			return mapMemberResultSet(rs.rows[0]);
		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
	}
	async update(updObj: Member): Promise<boolean>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = 	`update app_members 
						set first_name = '${updObj.first_name}', last_name = '${updObj.last_name}', biography = '${updObj.biography}', email = '${updObj.email}', telephone = '${updObj.telephone}'
						where member_id = $1`;
			
			await client.query(sql, [updObj.member_id]);
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
			let sql = 'delete from app_members where member_id = $1';
			let rs = await client.query(sql, [id]);
			return true;
		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
	}

	async getMemberByCredentials(un: string, pw: string) {
        
		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = 'select * from app_members where username = $1 and password = $2';
			let rs = await client.query(sql, [un, pw]);
			return mapMemberResultSet(rs.rows[0]);
		} catch (e) {
			throw new InternalServerError();
		} finally {
			client && client.release();
		}
    
	}







}


