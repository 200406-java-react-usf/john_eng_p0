import { CrudRepository } from './crud-repo';
import { Item } from '../models/item';

import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapItemResultSet } from '../util/result-set-mapper';

export class ItemRepository implements CrudRepository<Item>{

	
	async getAll(): Promise<Item[]> {

		let client:PoolClient;
		try{
			client = await connectionPool.connect();
			console.log(client);
			let sql = 'select * from app_items';
			let rs = await client.query(sql);
			console.log(rs.rows);
			return rs.rows.map(mapItemResultSet);
		}catch(e){
			console.log(e);
			// throw new InternalServerError();
		}finally{
			client && client.release;
		}
		
	}
	async getById(id: number): Promise<Item>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = 'select * from app_items where item_id = $1';
			let rs = await client.query(sql, [id]);
			return mapItemResultSet(rs.rows[0]);
		}catch(e){
			console.log(e);
		}finally{
			client && client.release;
		}
	}

	async getByUniqueKey(key: string, val: string): Promise<Item> {

		let client: PoolClient;

		try {
			client = await connectionPool.connect();
			let sql = `select * from app_items where ${key} = $1`;
			let rs = await client.query(sql, [val]);
			return mapItemResultSet(rs.rows[0]);
		} catch (e) {
			console.log(e);
			// throw new InternalServerError();
		} finally {
			client && client.release();
		}		
	}

	async save(newObj: Item): Promise<Item>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = `insert into app_items(item, comment, event_id, member_id) values
			('${newObj.item}', '${newObj.comment}', '${newObj.event_id}', '${newObj.member_id}');`;
			let rs = await client.query(sql);
			return mapItemResultSet(rs.rows[0]);  //make getByUniqueKey
		}catch(e){
			console.log(e);
		}finally{
			client && client.release;
		}
	}
	async update(updObj: Item): Promise<boolean>{
		let client: PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = 	`update app_items 
						set item = '${updObj.item}', comment = '${updObj.comment}', event_id = '${updObj.event_id}', member_id = '${updObj.member_id}'
						where item_id = $1`;
			console.log(sql);
			let rs = await client.query(sql, [updObj.item_id]);
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
			let sql = 'delete from app_items where item_id = $1';
			let rs = await client.query(sql, [id]);
			return true;
		}catch(e){
			console.log(e);
		}finally{
			client && client.release;
		}
	}
}
