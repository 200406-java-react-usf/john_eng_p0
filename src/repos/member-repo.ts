import { CrudRepository } from './crud-repo';
import memberData from '../data/member_db';
import { Member } from '../models/member';

import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapMemberResultSet } from '../util/result-set-mapper';

export class MemberRepository implements CrudRepository<Member>{


	async getAll(): Promise<Member[]> {

		let client: PoolClient;
		
		try{
			client = await connectionPool.connect();
			let sql = 'select * from app_members;';
			let rs = await client.query(sql);
			return rs.rows.map(mapMemberResultSet);
		}catch(e){
			console.log(e);
		}finally{
			client && client.release;

		}


	}
	async getById(id: number): Promise<Member>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = `select * from app_members where member_id = $1`;
			let rs = await client.query(sql, [id]);
			return mapMemberResultSet(rs.rows[0]);
		}catch(e){
			console.log(e);
		}finally{
			client && client.release;
		}


	}
	async save(newObj: Member): Promise<Member>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = `insert into app_members(first_name, last_name, biography, email, telephone) values
			('${newObj.first_name}', '${newObj.last_name}', '${newObj.biography}', '${newObj.email}', '${newObj.telephone}')`
			let rs = await client.query(sql);
			return mapMemberResultSet(rs.rows[0]);  //make getByUniqueKey
		}catch(e){
			console.log(e);
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
			console.log(sql)
			let rs = await client.query(sql, [updObj.member_id]);
			return true;

		}catch(e){
			console.log(e);
		}finally{
			client && client.release;
		}
	}

	async deleteById(id: number): Promise<boolean>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = `delete from app_members where member_id = $1`;
			let rs = await client.query(sql, [id]);
			return true;
		}catch(e){
			console.log(e);
		}finally{
			client && client.release;
		}
	}
}


