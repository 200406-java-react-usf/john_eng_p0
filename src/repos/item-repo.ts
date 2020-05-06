import { CrudRepository } from './crud-repo';
import { Item } from '../models/item';

import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapItemResultSet } from '../util/result-set-mapper';
import { InternalServerError } from '../errors/errors';

export class ItemRepository implements CrudRepository<Item>{

	
	async getAll(): Promise<Item[]> {

		let client:PoolClient;
		try{
			client = await connectionPool.connect();
			let sql = 'select * from app_items';
			let rs = await client.query(sql);
			return rs.rows.map(mapItemResultSet);
		}catch(e){
			throw new InternalServerError();
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
			throw new InternalServerError();
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
			throw new InternalServerError();
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
			await client.query(sql);
			let sql2 = 'SELECT * FROM app_items WHERE item_id=(SELECT max(item_id) FROM app_items)';
			let rs = await client.query(sql2);
			return mapItemResultSet(rs.rows[0]);
		}catch(e){
			throw new InternalServerError();
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

			await client.query(sql, [updObj.item_id]);
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
			let sql = 'delete from app_items where item_id = $1';
			await client.query(sql, [id]);

			return true;
		}catch(e){
			throw new InternalServerError();
		}finally{
			client && client.release;
		}
	}
}
